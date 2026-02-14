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
- Copy `.env.prod.example` to `.env` on the VPS.
- Ensure `IMAGE_NAMESPACE` matches your GHCR repo.
- Set `IMAGE_TAG` to `latest` or a specific tag/sha.

## Ports
- Expose only `80`/`443` on the VPS firewall.
- Keep `3000`/`4000` bound to localhost or block externally.
