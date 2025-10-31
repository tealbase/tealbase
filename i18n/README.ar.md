<div style="direction: rtl;" dir="rtl">

<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Tealbase

[Tealbase](https://tealbase.com)هو بديل مفتوح المصدر لـ(Firebase). نحن نبني ميزات (Firebase) باستخدام أدوات مفتوحة المصدر عالية الجودة تستخدمها الشركات.

- [x] قاعدة بيانات (Postgres) مستضافة. [الشرح](https://tealbase.com/docs/guides/database)
- [x] [الشرح](https://tealbase.com/docs/guides/auth) المصادقة والترخيص
- [x] واجهات برمجة التطبيقات التي يتم إنشاؤها تلقائيا.
  - [x] REST. [الشرح](https://tealbase.com/docs/guides/api)
  - [x] GraphQL. [الشرح](https://tealbase.com/docs/guides/graphql)
  - [x] اشتراكات الوقت الفعلي (Realtime subscriptions). [الشرح](https://tealbase.com/docs/guides/realtime)
- [x] الدوال.
  - [x] دوال قاعدة البيانات (Database Functions). [الشرح](https://tealbase.com/docs/guides/database/functions)
  - [x] Edge Functions [الشرح](https://tealbase.com/docs/guides/functions)
- [x] [الشرح](https://tealbase.com/docs/guides/storage) التخزين.
- [x] ذكاء اصطناعي + مجموعة أدوات المتجهات/التضمينات (AI + Vector/Embeddings Toolkit). [الشرح](https://tealbase.com/docs/guides/ai)
- [x] لوحة الإدارة.

![Tealbase Dashboard](https://raw.githubusercontent.com/tealbase/tealbase/master/apps/www/public/images/github/tealbase-dashboard.png)

شاهد "الإصدارات" من هذا المشروع للحصول على إشعار بالتحديثات الرئيسية.

<kbd><img src="https://raw.githubusercontent.com/tealbase/tealbase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

## الشرح

للحصول على الشرح الكامل، قم بزيارة [tealbase.com/docs](https://tealbase.com/docs).

لمعرفه كيفية دعم المشروع قم بزيارة [Getting Started](./DEVELOPERS.md).

## المجتمع والدعم

- [منتدى المجتمع](https://github.com/tealbase/tealbase/discussions). الأفضل لـ: المساعدة في البناء، والنقاش حول أفضل ممارسات قاعدة البيانات.
- [مشاكل GitHub](https://github.com/tealbase/tealbase/issues). الأفضل لـ: المشاكل والأخطاء التي تواجهها عند استخدامك لـ(Tealbase).
- [دعم البريد الإلكتروني](https://tealbase.com/docs/support#business-support). الأفضل لـ: مشاكل مع قاعدة بياناتك أو البنية التحتية.
- [ديسكورد](https://discord.tealbase.com/). الأفضل لـ: مشاركة التطبيقات الخاصه بك وقضاء بعض الوقت مع المجتمع.

## كيف يعمل (Tealbase)؟

Tealbase عبارة عن مجموعة من الأدوات مفتوحة المصدر. نحن نبني ميزات (Firebase) باستخدام أدوات مفتوحة المصدر عالية الجودة تستخدمها الشركات. إذا كانت الأدوات والمجتمعات موجودة ، باستخدام MIT أو Apache 2 أو ترخيص مفتوح مكافئ ، فسنستخدم هذه الأداة وندعمها. إذا لم تكن الأداة موجودة ، فإننا نبنيها ونفتح مصدرها بأنفسنا. (Tealbase) ليس تعيين 1 إلى 1 لـ(Firebase). هدفنا هو منح المطورين تجربة مطور تشبه (Firebase) باستخدام أدوات مفتوحة المصدر.

**الهيكلة الحالية**

(tealbase) هي [منصة مستضافة](https://tealbase.com/dashboard), يمكنك التسجيل والبدأ باستخدامها دون الحاجة لتثبيت أي شئ. يمكنك أيضا [استضافتها ذاتيا](https://tealbase.com/docs/guides/hosting/overview) و [تطويرها داخليا](https://tealbase.com/docs/guides/local-development).

![Architecture](https://github.com/tealbase/tealbase/blob/master/apps/docs/public/img/tealbase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) هي قاعدة بيانات قائمة على العلاقات الشيئية مع ٣٠ سنة من التطوير النشط التي اكسبتها سمعة وموثقية قوية وتمتاز بالمتانة والأداء.
- [Realtime](https://github.com/tealbase/realtime) هو خادم بلغة (Elixir) يمكنك من الاستماع لقاعدة البيانات لأي تغيرات سواء أنشاء أو تعديل أو مسح باستخدام ال(websocket).
- [PostgREST](http://postgrest.org/) هو خادم ويب يستطيع تحويل قاعدة بيانات PostgreSQL مباشرة ألي RESTful API
- [Storage](https://github.com/tealbase/storage-api) يقدم واجهة RESTful لأدارة الملفات المخزنة فس S3, باستخدام Postgres لأدارة الصلاحيات
- [postgres-meta](https://github.com/tealbase/postgres-meta) هو RESTful API لأدارة قاعدة البيانات الخاصة بك, تمكنك من الإستعلام عن الجداول, إضافة أدوار (مفرد دور), وتشغيل الأوامر.. الخ
- [GoTrue](https://github.com/netlify/gotrue) هو API مبني على SWT لأدارة المستخدمين وإنشاء رمز SWT.
- [Kong](https://github.com/Kong/kong) هو بوابة API لـcloud-native

#### مكتبات العميل

مكتباتنا معيارية. كل مكتبة فرعية هي تطبيق مستقل لنظام خارجي واحد. هذه إحدى الطرق التي ندعم بها الأدوات الحالية.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>اللغة</th>
    <th>العميل</th>
    <th colspan="4">مميزات العميل</th>
  </tr>
  <tr>
    <th></th>
    <th>Tealbase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/tealbase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/tealbase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/tealbase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/tealbase-community/tealbase-lang" target="_blank" rel="noopener noreferrer">tealbase-lang</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/tealbase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  <th colspan="6">⚡️ الرسمي ⚡️</th>
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/tealbase/tealbase-js" target="_blank" rel="noopener noreferrer">tealbase-js</a></td>
    <td><a href="https://github.com/tealbase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/tealbase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/tealbase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/tealbase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
  </tr>
  <th colspan="6">💚 المجتمعي 💚</th>
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/tealbase-community/tealbase-csharp" target="_blank" rel="noopener noreferrer">tealbase-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/tealbase/tealbase-flutter" target="_blank" rel="noopener noreferrer">tealbase-dart</a></td>
    <td><a href="https://github.com/tealbase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/tealbase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/tealbase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/tealbase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt" target="_blank" rel="noopener noreferrer">tealbase-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/tealbase-community/tealbase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/tealbase-community/tealbase-py" target="_blank" rel="noopener noreferrer">tealbase-py</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/tealbase-community/tealbase-rb" target="_blank" rel="noopener noreferrer">tealbase-rb</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/tealbase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/tealbase-community/tealbase-swift" target="_blank" rel="noopener noreferrer">tealbase-swift</a></td>
    <td><a href="https://github.com/tealbase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/tealbase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/tealbase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/tealbase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
  </tr>
</table>
## الترجمات

- [قائمة الترجمات](/i18n/languages.md) <!--- Keep only this -->

## الرعاة

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/tealbase)

</div>
