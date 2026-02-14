# VPS Deploy Notes

## Reverse proxy (Nginx)
- Copy `ops/nginx/shop.conf` to `/etc/nginx/sites-available/shop.conf`.
- Replace `server_name` with your domain.
- Enable the site and reload:
  - `sudo ln -s /etc/nginx/sites-available/shop.conf /etc/nginx/sites-enabled/shop.conf`
  - `sudo nginx -t && sudo systemctl reload nginx`

## TLS (optional, recommended)
- Use certbot for Let's Encrypt:
  - `sudo apt install certbot python3-certbot-nginx`
  - `sudo certbot --nginx -d example.com`

## Docker compose env
- `.env` is generated during CD from GitHub Secrets.
- Ensure the secrets in `ops/.env.ci.example` are configured in the repo.

## Ports
- Expose only `80`/`443` on the VPS firewall.
- Keep `3000`/`4000` bound to localhost or block externally.

## Automation
- Run the setup script on the VPS to apply all steps above.
- Required: `DOMAIN` (your domain).
- Optional: `EMAIL` (for Let's Encrypt), `INSTALL_CERTBOT=true`, `SETUP_UFW=true`.

```bash
DOMAIN=example.com EMAIL=admin@example.com INSTALL_CERTBOT=true SETUP_UFW=true \
  ./ops/setup_vps.sh
```

Notes:
- The script updates Nginx config, enables the site, reloads Nginx, creates `.env` if missing, and can install TLS.
- It expects to run inside the repo or with `APP_DIR` pointing to the repo root.
