# kip93.net

This repo contains the source files for my personal website.

For more info on usage permissions, see the [license](./LICENSE.md).


## Audits

<table align="center">
    <tbody>
        <tr>
            <th align="center"><a href="https://kip93.net/">Home page</a></th>
            <th align="center"><a href="https://kip93.net/resume/">Résumé page</a></th>
        </tr>
        <tr>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fkip93.net%2F"><img src="./metrics/home.svg"/></a></td>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fkip93.net%2Fresume%2F"><img src="./metrics/resume.svg"/></a></td>
        </tr>
        <tr>
            <th align="center"><a href="https://kip93.net/about/">About page</a></th>
            <th align="center"><a href="https://gemini.kip93.net/">Gemini mirror</a></th>
        </tr>
        <tr>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fkip93.net%2Fabout%2F"><img src="./metrics/about.svg"/></a></td>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fgemini.kip93.net%2F"><img src="./metrics/gemini.svg"/></a></td>
        </tr>
        <tr>
            <td colspan="2" align="right"><em>
                Generated with <a href="https://github.com/lowlighter/metrics/tree/latest/">lowlighter/metrics v3.34.0</a><br> <!-- VERSION => MAJOR.minor.patch -->
                Last updated @ 2 Nov 2024, 04:33:56 UTC <!-- meta.generated => DD/MM/YYYY, hh:mm -->
            </em></td>
        </tr>
    </tbody>
</table>


## Overview

This is a summary of the contents of this repo.

### HTML website

The folder [html](./html) contains the content to be shown at [https://kip93.net/](https://kip93.net/), which is served by [nginx](https://nginx.com/), as
defined in [this config file](./nginx/sites-available/website).

### GEMINI capsule

This is the content available @ [gemini://kip93.net/](gemini://kip93.net/), based on the contents of the [gmi](./gmi) folder. These pages are handled by
[agate](https://github.com/mbrubeck/agate), which has its configurations defined [here](./agate/agate.service).

**NOTE:** For better accessibility of the content, I also mirror and expose the same info on [https://gemini.kip93.net/](https://gemini.kip93.net/) as I do on
gemini.

## Update
```shell
rsync -EhmPpruvz --delete-after ./gmi/ <user@hostname>:/var/www/gmi
rsync -EhmPpruvz --delete-after ./html/ <user@hostname>:/var/www/html
```
