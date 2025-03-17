# PG&E dividend calculator

This is a simple web app to calculate how many shares of PG&E you would need to own to pay your electricity bill via dividend income.

You can visit this site at [https://pge-dividend.vercel.app/](https://pge-dividend.vercel.app/).

![preview](/public/readme.png)

## How it works

On load the app will fetch PG&E's ($PCG) current share price from [Finnhub](https://finnhub.io/). The current share price is then used to calculate how many shares you would need to own in order to pay your electricity bill via dividend income.

I've statically set the quarterly dividend to $0.10 per share which is correct as of 2025-03-17.
