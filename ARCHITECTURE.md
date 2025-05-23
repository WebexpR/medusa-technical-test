# Medusa Technical Test - Architecture Overview

## Data Model
[Access the diagram](https://mermaid.live/edit#pako:eNqlUktrwzAM_itG57Y0aZ6-bgzGLr0NRqCYWE3Majs4Cnsk-e9z08dou8OgOkn69EmfZfVQWonAAd2jEpUTujDM26tq651qiQ3DfG77c_xMqBlnpTUklGkviydw9IRhYGtnZVeSr3W4RYemRF991bw_xHtrySlTMSXZ-uUmS4p2eJMtu5asRrdR8heTgpCURlY69K7cCPoD7Bp5AY7X0qan_Ffex5HkhbCnW7g5rOIavVPpacH37VBiWzrVkLLmbmUwg8opCZxchzPwP6PFPoRJYgFUo8YCuHelcO8FFGbPaYR5s1afaM52VQ18K3atjw5Djqd5zvpzkugebGcI-CqZegDv4RN4mKWLOAuSLE7CMI3SwKNfwNN4kUSrMM6DcBnGaRqNM_iepi4XaZ5HSZTneZAEqyjJxh8bO_a7)

## Service Layer Architecture
[Access the diagram](https://mermaid.live/edit#pako:eNplkF1rgzAYhf-KvNdW_IofuRi0uo5eDEo3GEx3EUxWw9RIjGOd-N-XZqsgy1XOOc958zFBJSgDDGdJ-tp6zsvO0mtbbI8H6yRGxYY3a7O5s3bFE5OfvNL6F9kZOyte-FA3fFAn1ouBKyEvKyBfgINi7T8oM9D9AlmP-jrNX5ibcL-asAL2BngojlLQsbqVwdav4RSwkiOzoWWyJVcJ07VVgqpZy0rAekuJ_Cih7Gbd6Un3KkR7q0kxnmvA76QZtBp7ShTLOdH_1C6uZB1lMhNjpwD7bmCGAJ7gCzCKnRi5YRKEAUpQiiIbLtpFjhsFie-lvh95Op9t-Danuk7seS4K0igOY5Sknjf_ALwKfng)

## API Endpoints
[Access the diagram](https://mermaid.live/edit#pako:eNptkMtugzAQRX8FzZoQHjEPLyolkGZTqVVTKVIhCwtPg9UAkYH0gfj3GodWalMvrJm558543ENecwQKB8lOhXH3mFWGOss0Pgqs2r0xm90Yq3SzfjLmb6IpjqJpm_0EaTH-I86p4L-AJH243_5jv9wrzazT3aRuUZ5FjtYYLyse1516xQWNNXp7hUpspcAzTliisc0VlktkLe7BVLsKDrSVHZpQoizZmEI_2jNoCywxA6pCzuRrBlk1KM-JVc91XX7bZN0dCqAv7NiorDtx1ToRTP1i-VOVWHGUegOgrh3oJkB7eAdKAisg9iL0Fh4JSUR8Ez5UlVi274WuE7mu7yh9MOFTT7WtwHFs4kV-sAhIGDnO8AWIX4fy)

## Notes

- All components are written in TypeScript
- Models extend from `BaseEntity` from `@medusajs/medusa`
- Repositories serve as the Data Access Layer (DAL)
- Services handle business logic and orchestration
- API routes handle HTTP requests and responses
- All entities include `id`, `created_at`, and `updated_at` fields 