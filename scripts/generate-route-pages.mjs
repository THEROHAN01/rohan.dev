import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(resolve(root, "index.html"), "utf8");

const routes = [
  ["/work/turtleauth", "turtleauth", "A production-ready authentication and identity service with sessions, JWTs, OAuth/OIDC, MFA, passkeys, and RBAC."],
  ["/projects", "Projects", "A small collection of projects I've built, from retrieval infrastructure to personal productivity tools."],
  ["/projects/jarvis", "jarvis", "Production-grade retrieval infrastructure for building accurate, scalable, enterprise-ready RAG systems."],
  ["/projects/crowd-vibe", "crowd-vibe", "An experiment in sensing the mood of a crowd or event in real time."],
  ["/projects/brainly-monorepo", "brainly-monorepo", "A Brainly-style knowledge and bookmarking app, built as a monorepo."],
  ["/projects/lockedin", "lockedin", "An execution operating system that transforms long-term goals into daily missions."],
  ["/projects/open-source", "More Soon", "More projects, including open-source contributions, are coming soon."]
];

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceOne(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in index.html`);
  return html.replace(pattern, replacement);
}

for (const [path, title, description] of routes) {
  const pageTitle = `${title} | Rohan Salunkhe`;
  const canonical = `https://rohansalunkhe.dev${path}`;
  const escapedTitle = escapeAttribute(pageTitle);
  const escapedDescription = escapeAttribute(description);
  const escapedCanonical = escapeAttribute(canonical);

  let html = source;
  html = replaceOne(html, /<title>[^<]*<\/title>/, `<title>${escapedTitle}</title>`, "title");
  html = replaceOne(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapedDescription}">`, "description");
  html = replaceOne(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escapedCanonical}">`, "canonical URL");
  html = replaceOne(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapedTitle}">`, "Open Graph title");
  html = replaceOne(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapedDescription}">`, "Open Graph description");
  html = replaceOne(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${escapedCanonical}">`, "Open Graph URL");
  html = replaceOne(html, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapedTitle}">`, "X title");
  html = replaceOne(html, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapedDescription}">`, "X description");

  const output = resolve(root, `${path.slice(1)}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log(path);
}

let notFound = source;
notFound = replaceOne(notFound, /<title>[^<]*<\/title>/, "<title>Not Found | Rohan Salunkhe</title>", "404 title");
notFound = replaceOne(notFound, /<meta name="description" content="[^"]*">/, '<meta name="description" content="This page does not exist.">', "404 description");
notFound = replaceOne(notFound, /<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">', "404 robots policy");
await writeFile(resolve(root, "404.html"), notFound);
console.log("/404.html");
