<div style="direction: rtl;" dir="rtl">

<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Tealbase

‫[Tealbase](https://tealbase.com) یک جایگزین اپن‌سورس برای Firebase است. ما در حال ساخت امکانات Firebase با استفاده ابزارهای اپن‌سورس و کلاس تجاری هستیم.

- [x] ‫دیتابیس Postgres میزبانی‌شده
- [x] اتصال و ارتباط بلادرنگ
- [x] احراز هویت و کنترل سطح دسترسی
- [x] ‫ساختن خودکار APIها
- [x] پنل کاربری
- [x] فضای ذخیره‌سازی
- [x] توابع

![Tealbase Dashboard](https://raw.githubusercontent.com/tealbase/tealbase/master/apps/www/public/images/github/tealbase-dashboard.png)

## مستندات

برای مستندات کامل به‫ [tealbase.com/docs](https://tealbase.com/docs) مراجعه کنید.

## جامعه و پشتیبانی

- ‫[Community Forum](https://github.com/tealbase/tealbase/discussions). گزینه مناسب برای راهنمایی گرفتن در مورد توسعه و روش مناسب استفاده از دیتابیس می‌باشد.
- ‫[GitHub Issues](https://github.com/tealbase/tealbase/issues). گزینه مناسب برای خطاها و باگ‌هایی که در استفاده از Tealbase برمی‌خوردید.
- ‫[Email Support](https://tealbase.com/docs/support#business-support). بهترین گزینه برای مشکلات مرتبط با دیتابیس و زیرساخت است.

## وضعیت

- [x] ‫آلفا: در حال تست Tealbase با گروه محدود از کاربران هستیم.
- [x] ‫آلفای عمومی: همه می‌تواند برای استفاده از طریق [tealbase.com/dashboard](https://tealbase.com/dashboard) ثبت‌نام کنند. اما سخت نگیرید، ممکن است مشکلات معدودی وجود داشته باشد.
- [x] بتای عمومی: قابل اتکا برای اکثر استفاده‌های غیر-تجاری می‌باشد.
- [ ] عمومی: آماده برای استفاده تجاری.

در حال حاضر در مرحله بتای عمومی هستیم‫. "releases" این مخزن را دنبال کنید تا در جریان به‌روزسانی‌ها قرار بگیرید.

<kbd><img src="https://raw.githubusercontent.com/tealbase/tealbase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="این مخزن را دنبال کنید."/></kbd>

---

## چطور کار میکند

‫Tealbase ترکیبی از ابزارهای اپن‌سورس است. ما امکانات Firebase را با استفاده از محصولات اپن‌سورس و کلاس تجاری می‌سازیم. اگر ابزار و جامعه‌ی آن وجود داشته باشد، با استفاده از گواهینامه MIT, Apache 2 یا هر گواهینامه‌ی معادلی، ما از آن ابزار استفاده و پشتیبانی می‌کنیم. اگر ابزاری وجود نداشته باشد، ما خودمان آن را می‌سازیم و اپن‌سورس می‌کنیم. Tealbase یک محصول دقیقا شبیه و معادل یک‌به‌یک Firebase نیست. ما سعی داریم با استفاده از ابزارهای اپن‌سورس تجربه شبیه به Firebase به توسعه‌دهندگان ارائه دهیم.

**معماری فعلی**

‫Tealbase یک [پلتفرم میزبانی‌شده](https://tealbase.com/dashboard) است. شما می‌توانید بدون نصب چیزی، ثبت‌نام و شروع به استفاده از Tealbase کنید. ما هنوز در حال ساختن تجربه‌ی توسعه local هستیم - این تمرکز اصلی فعلی ما علاوه بر اتکاپذیری است.

![معماری](https://github.com/tealbase/tealbase/blob/master/apps/docs/public/img/tealbase-architecture.svg)

- ‫[PostgreSQL](https://www.postgresql.org/) یک سیستم دیتابیس object-relational با بیش از ۳۰سال سابقه توسعه می‌باشد که اعتبار زیادی بابت اتکاپذیری، امکانات قوی و سرعت کسب کرده است.
- ‫[Realtime](https://github.com/tealbase/realtime) یک سرور Elixir است که اجازه می‌دهد به اضافه کردن، به‌روز کردن و حذف کردن‌های PostgreSQL با استفاده از websockets گوش دهید. Tealbase به عملکرد داخلی PostgreSQL برای replication گوش می‌دهد، replication byte stream را به JSON تبدیل می‌کند و JSON را از طریق websock به خارج broadcast می‌کند.
- ‫[PostgREST](http://postgrest.org/) یک وب سرور است که دیتابیس PostgreSQL را به صورت مستقیم به RESTful API تبدیل می‌کند.
- ‫[Storage](https://github.com/tealbase/storage-api) یک رابط RESTful برای مدیریت فایل‌های ذخیره شده در S3 با استفاده از Postgres برای مدیریت دسترسی‌ها فراهم می‌کند.
- ‫[postgres-meta](https://github.com/tealbase/postgres-meta) یک RESTful API برای مدیریت Postgres، دریافت جدول‌های داده، اضافه کردن roleها و اجرای queryها و غیره می‌باشد.
- ‫[GoTrue](https://github.com/netlify/gotrue) یک API بر پایه‌ی SWT برای مدیریت کاربران و صدور توکن احراز هویت است.
- ‫[Kong](https://github.com/Kong/kong) یک gateway ابری-بومی می‌باشد.

#### کتابخانه‌های کلاینت

کتابخانه‌ی کلاینت ما چند-تیکه است. هر زیر-کتابخانه یک پیاده‌سازی جداگانه برای یک سیستم خارجی واحد دارد. این یکی از روش‌های ما برای پشتیانی از ابزارهای موجود است.

- **‫`tealbase-{lang}`**: کتابخانه‌ها را ترکیب می‌کند و تکمیل‌تر خواهد بود.
  - ‫`postgrest-{lang}`: کتابخانه کلاینت برای کارکردن با [PostgREST](https://github.com/postgrest/postgrest)
  - ‫`realtime-{lang}`: کتابخانه کلاینت برای کارکردن با [Realtime](https://github.com/tealbase/realtime)
  - ‫`gotrue-{lang}`: کتابخانه کلاینت برای کارکردن با [GoTrue](https://github.com/netlify/gotrue)

| مخزن                  | رسمی                                             | جامعه                                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`tealbase-{lang}`** | [`JS`](https://github.com/tealbase/tealbase-js)  | [`C#`](https://github.com/tealbase/tealbase-csharp) \| [`Flutter`](https://github.com/tealbase/tealbase-flutter) \| [`Python`](https://github.com/tealbase/tealbase-py) \| `Rust`                                          |
| `postgrest-{lang}`    | [`JS`](https://github.com/tealbase/postgrest-js) | [`C#`](https://github.com/tealbase/postgrest-csharp) \| [`Dart`](https://github.com/tealbase/postgrest-dart) \| [`Python`](https://github.com/tealbase/postgrest-py) \| [`Rust`](https://github.com/tealbase/postgrest-rs) |
| `realtime-{lang}`     | [`JS`](https://github.com/tealbase/realtime-js)  | [`C#`](https://github.com/tealbase/realtime-csharp) \| [`Dart`](https://github.com/tealbase/realtime-dart) \| [`Python`](https://github.com/tealbase/realtime-py) \| `Rust`                                                |
| `gotrue-{lang}`       | [`JS`](https://github.com/tealbase/gotrue-js)    | [`C#`](https://github.com/tealbase/gotrue-csharp) \| [`Dart`](https://github.com/tealbase/gotrue-dart) \| [`Python`](https://github.com/tealbase/gotrue-py) \| `Rust`                                                      |

## ترجمه‌ها

- [لیست ترجمه‌ها](/i18n/languages.md)

---

## اسپانسرها

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/tealbase)

</p>

</div>
