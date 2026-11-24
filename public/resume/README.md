# Résumé PDF

Place your actual résumé PDF in this directory and name it `Marc-Toubia-Resume.pdf`.

The résumé section already links to this file with an HTML `download` attribute.
Vite serves files from `public` directly and copies them into the production build.
The JPG thumbnail is a separate preview; it is not the downloadable PDF.

Until the PDF is added, the download link will not deliver a résumé. Add the PDF
before publishing the site, then test the download on the deployed site.
