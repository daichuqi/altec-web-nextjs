import crypto from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import https from "node:https";
import path from "node:path";
import process from "node:process";
import { fail } from "./lib/common.mjs";
import { assertRequiredEnv, loadLocalEnv } from "./lib/env.mjs";

const defaultDomain = "www.altec-sz.com";
const domainName = process.env.ALIYUN_CDN_DOMAIN || defaultDomain;
const certRoot = process.env.ALIYUN_CDN_CERT_DIR || path.join(os.homedir(), ".acme.sh", `${domainName}_ecc`);
const certFile = process.env.ALIYUN_CDN_CERT_FULLCHAIN || path.join(certRoot, "fullchain.cer");
const keyFile = process.env.ALIYUN_CDN_CERT_KEY || path.join(certRoot, `${domainName}.key`);

function percentEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/'/g, "%27");
}

function signedBody(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");
  const stringToSign = `POST&%2F&${percentEncode(sorted)}`;
  const signature = crypto
    .createHmac("sha1", `${process.env.ALIYUN_ACCESS_KEY_SECRET}&`)
    .update(stringToSign)
    .digest("base64");

  return Object.keys({ ...params, Signature: signature })
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(key === "Signature" ? signature : params[key])}`)
    .join("&");
}

async function postToCdn(params) {
  const body = signedBody({
    Format: "JSON",
    Version: "2018-05-10",
    AccessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    SignatureMethod: "HMAC-SHA1",
    Timestamp: new Date().toISOString(),
    SignatureVersion: "1.0",
    SignatureNonce: crypto.randomBytes(16).toString("hex"),
    ...params,
  });

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "cdn.aliyuncs.com",
        method: "POST",
        path: "/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let data = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => resolve({ statusCode: response.statusCode, data }));
      },
    );

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

loadLocalEnv();
assertRequiredEnv(["ALIYUN_ACCESS_KEY_ID", "ALIYUN_ACCESS_KEY_SECRET"]);

for (const file of [certFile, keyFile]) {
  if (!existsSync(file)) {
    fail(`Missing certificate file: ${file}`);
  }
}

const response = await postToCdn({
  Action: "SetCdnDomainSSLCertificate",
  DomainName: domainName,
  SSLProtocol: "on",
  CertType: "upload",
  CertName: `${domainName}-letsencrypt-${new Date().toISOString().replace(/[:.]/g, "-")}`,
  SSLPub: readFileSync(certFile, "utf8"),
  SSLPri: readFileSync(keyFile, "utf8"),
});

if (response.statusCode !== 200) {
  fail(`CDN certificate upload failed with HTTP ${response.statusCode}: ${response.data}`);
}

console.log(`Uploaded HTTPS certificate to CDN for ${domainName}.`);
