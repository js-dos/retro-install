# Install

```
yarn run vite build && \
    cd dist && \
    aws s3 --endpoint-url=https://storage.yandexcloud.net sync --acl public-read . s3://retro-install --delete && \
    cd ..
```