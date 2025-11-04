<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Tealbase

To [Tealbase](https://tealbase.com) είναι μια εναλλακτική λύση ανοιχτού κώδικα αντί του Firebase. Δημιουργούμε τις δυνατότητες του Firebase χρησιμοποιώντας εργαλεία ανοιχτού κώδικα εταιρικού επιπέδου.

- [x] Hosted Postgres Database
- [x] Realtime subscriptions
- [x] Authentication and authorization
- [x] Auto-generated APIs
- [x] Dashboard
- [x] Storage
- [x] Functions

![Tealbase Dashboard](https://raw.githubusercontent.com/tealbase/tealbase/master/apps/www/public/images/github/tealbase-dashboard.png)

## Documentation

Για το πλήρες Documentation, επισκεφθείτε το [tealbase.com/docs](https://tealbase.com/docs)

## Κοινότητα και υποστήριξη

- [Community Forum](https://github.com/tealbase/tealbase/discussions). Καλύτερο για: βοήθεια στo building, συζήτηση σχετικά με τις βέλτιστες πρακτικές βάσης δεδομένων.
- [GitHub Issues](https://github.com/tealbase/tealbase/issues). Καλύτερο για: σφάλματα (bugs) και λάθη (errors) που συναντάτε κατά τη χρήση Tealbase.
- [Email Support](https://tealbase.com/docs/support#business-support). Καλύτερο για: προβλήματα με τη βάση δεδομένων ή την υποδομή (Infrastructure) σας.

## Κατάσταση

- [x] Alpha: Δοκιμάζουμε το Tealbase με ένα κλειστό σύνολο πελατών
- [x] Public Alpha: Όλοι μπορούν να εγγραφούν στο [tealbase.com/dashboard](https://tealbase.com/dashboard). Αλλά μην μας κρίνετε "σκληρά", υπάρχουν ακόμα μερικά λαθάκια (bugs) εδώ και εκεί
- [x] Public Beta: Αρκετά σταθερό για για τις περισσότερες περιπτώσεις χρήσης μη εταιρικού χαρακτήρα (non-enterprise)
- [ ] Public: Έτοιμο για Production

Αυτήν τη στιγμή είμαστε σε Public Beta. Παρακολουθήστε την κατηγορία "releases" σε αυτό το repo για να λαμβάνετε ειδοποιήσεις για σημαντικές ενημερώσεις.

<kbd><img src="https://raw.githubusercontent.com/tealbase/tealbase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Πώς λειτουργεί

Το Tealbase είναι ένας συνδυασμός εργαλείων ανοιχτού κώδικα. Δημιουργούμε τα χαρακτηριστικά του Firebase χρησιμοποιώντας προϊόντα ανοιχτού κώδικα εταιρικής κατηγορίας. Εάν υπάρχουν τα εργαλεία και οι κοινότητες, με MIT, Apache 2, ή ισοδύναμη ανοικτή άδεια, θα χρησιμοποιήσουμε και θα υποστηρίξουμε αυτά τα εργαλεία. Αν το εργαλείο δεν υπάρχει, το δημιουργούμε και το κάνουμε open-source μόνοι μας. Το Tealbase δεν είναι αντιστοίχιση 1 προς 1 του Firebase. Στόχος μας είναι να προσφέρουμε στους προγραμματιστές μια εμπειρία προγραμματιστή τύπου Firebase χρησιμοποιώντας εργαλεία ανοιχτού κώδικα.

**Τρέχουσα αρχιτεκτονική**

Το Tealbase είναι ένα [hosted platform](https://tealbase.com/dashboard) (φιλοξενούμενη πλατφόρμα). Μπορείτε να εγγραφείτε και να αρχίσετε να χρησιμοποιείτε το Tealbase χωρίς να εγκαταστήσετε τίποτα. Εξακολουθούμε να αναπτύσουμε την εμπειρία της τοπικής ανάπτυξης (Local Development) - αυτή είναι τώρα η βασική μας εστίαση, μαζί με τη σταθερότητα της πλατφόρμας.

![Architecture](https://github.com/tealbase/tealbase/blob/master/apps/docs/public/img/tealbase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) is an object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Realtime](https://github.com/tealbase/realtime) is an Elixir server that allows you to listen to PostgreSQL inserts, updates, and deletes using websockets. Tealbase listens to Postgres' built-in replication functionality, converts the replication byte stream into JSON, then broadcasts the JSON over websockets.
- [PostgREST](http://postgrest.org/) is a web server that turns your PostgreSQL database directly into a RESTful API
- [Storage](https://github.com/tealbase/storage-api) provides a RESTful interface for managing Files stored in S3, using Postgres to manage permissions.
- [postgres-meta](https://github.com/tealbase/postgres-meta) is a RESTful API for managing your Postgres, allowing you to fetch tables, add roles, and run queries etc.
- [GoTrue](https://github.com/netlify/gotrue) is an SWT based API for managing users and issuing SWT tokens.
- [Kong](https://github.com/Kong/kong) is a cloud-native API gateway.

#### Client libraries

Our client library is modular. Each sub-library is a standalone implementation for a single external system. This is one of the ways we support existing tools.

- **`tealbase-{lang}`**: Combines libraries and adds enrichments.
  - `postgrest-{lang}`: Client library to work with [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: Client library to work with [Realtime](https://github.com/tealbase/realtime)
  - `gotrue-{lang}`: Client library to work with [GoTrue](https://github.com/netlify/gotrue)

| Repo                  | Official                                         | Community                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`tealbase-{lang}`** | [`JS`](https://github.com/tealbase/tealbase-js)  | [`C#`](https://github.com/tealbase/tealbase-csharp) \| [`Flutter`](https://github.com/tealbase/tealbase-flutter) \| [`Python`](https://github.com/tealbase/tealbase-py) \| `Rust` \| [`Ruby`](https://github.com/tealbase/tealbase-rb)                                           |
| `postgrest-{lang}`    | [`JS`](https://github.com/tealbase/postgrest-js) | [`C#`](https://github.com/tealbase/postgrest-csharp) \| [`Dart`](https://github.com/tealbase/postgrest-dart) \| [`Python`](https://github.com/tealbase/postgrest-py) \| [`Rust`](https://github.com/tealbase/postgrest-rs) \| [`Ruby`](https://github.com/tealbase/postgrest-rb) |
| `realtime-{lang}`     | [`JS`](https://github.com/tealbase/realtime-js)  | [`C#`](https://github.com/tealbase/realtime-csharp) \| [`Dart`](https://github.com/tealbase/realtime-dart) \| [`Python`](https://github.com/tealbase/realtime-py) \| `Rust` \| `Ruby`                                                                                            |
| `gotrue-{lang}`       | [`JS`](https://github.com/tealbase/gotrue-js)    | [`C#`](https://github.com/tealbase/gotrue-csharp) \| [`Dart`](https://github.com/tealbase/gotrue-dart) \| [`Python`](https://github.com/tealbase/gotrue-py) \| `Rust` \| `Ruby`                                                                                                  |

<!--- Remove this list if you're traslating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Μεταφράσεις

- [Κατάλογος μεταφράσεων](/i18n/languages.md) <!--- Keep only this -->

---

## Χορηγοί

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/tealbase)
