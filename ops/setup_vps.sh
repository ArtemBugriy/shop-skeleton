#!/usr/bin/env bash
set -euo pipefail

# Automate VPS setup: nginx reverse proxy, optional TLS, env file, optional firewall.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

DOMAIN="${DOMAIN:-}"
EMAIL="${EMAIL:-}"
APP_DIR="${APP_DIR:-${REPO_DIR}}"
NGINX_CONF_SRC="${NGINX_CONF_SRC:-${SCRIPT_DIR}/nginx/shop.conf}"
NGINX_CONF_DST="${NGINX_CONF_DST:-/etc/nginx/sites-available/shop.conf}"
NGINX_CONF_LINK="${NGINX_CONF_LINK:-/etc/nginx/sites-enabled/shop.conf}"
INSTALL_CERTBOT="${INSTALL_CERTBOT:-false}"
SETUP_UFW="${SETUP_UFW:-false}"

if [[ -z "${DOMAIN}" ]]; then
  echo "DOMAIN is required (e.g., DOMAIN=example.com)." >&2
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx is not installed; skipping reverse proxy setup." >&2
  exit 1
fi

if [[ ! -f "${NGINX_CONF_SRC}" ]]; then
  echo "Missing nginx config template at ${NGINX_CONF_SRC}." >&2
  exit 1
fi

if [[ ! -d "${APP_DIR}" ]]; then
  echo "APP_DIR not found: ${APP_DIR}." >&2
  exit 1
fi

if [[ "${EUID}" -ne 0 ]]; then
  SUDO="sudo"
else
  SUDO=""
fi

TMP_CONF="$(mktemp)"
trap 'rm -f "${TMP_CONF}"' EXIT
sed "s/server_name example.com;/server_name ${DOMAIN};/" "${NGINX_CONF_SRC}" > "${TMP_CONF}"

${SUDO} mkdir -p "$(dirname "${NGINX_CONF_DST}")" "$(dirname "${NGINX_CONF_LINK}")"
${SUDO} cp "${TMP_CONF}" "${NGINX_CONF_DST}"

if [[ ! -e "${NGINX_CONF_LINK}" ]]; then
  ${SUDO} ln -s "${NGINX_CONF_DST}" "${NGINX_CONF_LINK}"
fi

${SUDO} nginx -t
${SUDO} systemctl reload nginx


if [[ "${INSTALL_CERTBOT}" == "true" ]]; then
  if command -v apt-get >/dev/null 2>&1; then
    ${SUDO} apt-get update
    ${SUDO} apt-get install -y certbot python3-certbot-nginx
  else
    echo "apt-get not found; skipping certbot install." >&2
  fi
fi

if [[ -n "${EMAIL}" ]] && command -v certbot >/dev/null 2>&1; then
  ${SUDO} certbot --nginx -d "${DOMAIN}" -m "${EMAIL}" --agree-tos --non-interactive
else
  if [[ -n "${EMAIL}" ]]; then
    echo "certbot not available; skipping TLS issuance." >&2
  fi
fi

if [[ "${SETUP_UFW}" == "true" ]]; then
  if command -v ufw >/dev/null 2>&1; then
    ${SUDO} ufw allow 80/tcp
    ${SUDO} ufw allow 443/tcp
    ${SUDO} ufw --force enable
  else
    echo "ufw not installed; skipping firewall setup." >&2
  fi
fi

echo "VPS setup completed for ${DOMAIN}."
