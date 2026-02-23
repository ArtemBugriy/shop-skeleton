COMPOSE_BASE = docker compose -f docker-compose.dev.yml
COMPOSE_PROD = docker compose -f docker-compose.prod.yml

# Быстрый старт: поднимет сервисы, при необходимости пересоберёт образы (может использовать кэш).
docker-up:
	$(COMPOSE_BASE) up -d --build

# Только собрать образы (с кэшем).
docker-build:
	$(COMPOSE_BASE) build

# Жёсткая пересборка: пересобирает образы (с кэшем), пересоздаёт контейнеры.
docker-rebuild:
	$(COMPOSE_BASE) up -d --build --force-recreate

# Пересборка без кэша, чтобы точно увидеть шаги Dockerfile.dev (npm ci) в build-логах.
docker-rebuild-nocache:
	$(COMPOSE_BASE) down
	$(COMPOSE_BASE) build --no-cache --progress=plain
	$(COMPOSE_BASE) up -d

# Полный reset: остановить, удалить контейнеры + volumes (включая node_modules volumes), затем поднять заново.
# Используй, если кажется что node_modules "залипли" в volume или хочешь полностью чистый старт.
docker-reset:
	$(COMPOSE_BASE) down -v
	$(COMPOSE_BASE) up -d --build

# Остановить dev окружение (без удаления volumes).
docker-down:
	$(COMPOSE_BASE) down

# Логи dev окружения (последние 200 строк).
docker-logs:
	$(COMPOSE_BASE) logs --tail=200 --no-color

# --- Production helpers ---
# Usage:
#   make prod-up IMAGE_TAG=<sha-or-version>
#   make prod-restart IMAGE_TAG=<sha-or-version>
# IMAGE_NAMESPACE defaults to artembugriy/shop-skeleton (see docker-compose.prod.yml)

prod-pull:
	$(COMPOSE_PROD) pull

prod-up:
	$(COMPOSE_PROD) pull
	$(COMPOSE_PROD) up -d

prod-restart:
	$(COMPOSE_PROD) pull
	$(COMPOSE_PROD) up -d --force-recreate

prod-logs:
	$(COMPOSE_PROD) logs --tail=200 --no-color

prod-down:
	$(COMPOSE_PROD) down
