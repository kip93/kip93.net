# kip93.net

This repo contains all the info on my personal website, as well as some scripts and configurations. The purpose of this is 2 fold: for one, I want to keep the
website version controlled to help me track changes on the site's content; and 2 I like to make this freely available for anyone to maybe reuse some of my
scripts and shit.

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
            <th align="center"><a href="https://kip93.net/gemini/">Gemini mirror</a></th>
        </tr>
        <tr>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fkip93.net%2Fabout%2F"><img src="./metrics/about.svg"/></a></td>
            <td><a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fkip93.net%2Fgemini%2F"><img src="./metrics/gemini.svg"/></a></td>
        </tr>
        <tr>
            <td colspan="2" align="right"><em>
                Generated with <a href="https://github.com/lowlighter/metrics/tree/latest/">lowlighter/metrics v3.15.0</a><br> <!-- VERSION => MAJOR.minor.patch -->
                Last updated @ 13 Nov 2021, 04:18:44 UTC <!-- meta.generated => DD/MM/YYYY, hh:mm -->
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

**NOTE:** For better accessibility of the content, I also mirror and expose the same info on [https://kip93.net/gemini/](https://kip93.net/gemini/) as I do on
gemini.

### Gemtext to HTML script

Included in this repo is [a script](./g2h) that I use to convert the `.gmi` files into `.html` ones. The result of which is what you can see when you go to
[https://kip93.net/gemini/](https://kip93.net/gemini/), the file has been parsed and formatted and styled to be able to be rendered in a regular browser.

To use the file you simply need `python3.6+` installed (and a UNIX-like machine, such as Mac or Linux). The file itself is executable so just open a terminal
and type `./g2h` regenerate the files.


## Setting up the server

These steps should be done before anything else to ensure that the server has at least a basic level of security.

**DISCLAIMER:** I am no security expert. These configurations are what I have gathered from multiple online sources, but I cannot vouch for their veracity or
effectiveness.

### User

The first step should be to set up a non-privileged user to connect to the server. For that we will log in this once using the root user and run:

```shell
# Install sudo (or doas if you so prefer) to allow us to run certain commands as root (example here is using apt for Debian based distros).
apt install sudo
# Create the user and add them to the sudo group to allow them to use sudo (example here works with Debian based distros,
# but some others call this group different names, such as wheel; check how this is done on your OS of choice).
useradd -m <user> -G sudo
# Log out of the root user.
exit
```

### Firewall

This sets up a simple firewall through the use of [ufw](https://git.launchpad.net/ufw/tree/README), but if your server provider already includes a firewall you
can use that instead if you want.

```shell
# Install the firewall (example here is using apt for Debian based distros).
sudo apt install ufw
# Set default rules.
ufw default deny incoming
ufw default allow outgoing
# Set rules for used ports.
ufw limit 22/tcp  # SSH
ufw allow 80/tcp  # HTTP
ufw allow 443/tcp  # HTTPS
ufw allow 1965/tcp  # GEMINI
# Show the configuration to do a final check.
ufw status verbose
# Enable the firewall.
ufw enable
```

### SSH

SSH connections should be done with keys rather than passwords.

First, copy your public key to the server.

```shell
ssh-copy-id <user@hostname>
```

Then go to `/etc/ssh/sshd_config` (DO NOT FORGET THE "D" IN THE FILENAME) and set the following lines as such:

```text
ChallengeResponseAuthentication no
UsePAM no
PasswordAuthentication no
PermitRootLogin no
```

And finally restart the SSH daemon.

```shell
sudo systemctl restart sshd
```

### Auto ban

To deter attackers we can ban them after the server detects several failed connection attempts by using [fail2ban](https://www.fail2ban.org/).

```shell
# Install the program (example here is using apt for Debian based distros).
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Networking

Go to the file `/etc/sysctl.conf` and locate the following lines, setting them to the values shown here:

```text
net.ipv4.conf.default.rp_filter=1
net.ipv4.conf.all.rp_filter=1

net.ipv4.conf.all.accept_redirects=0
net.ipv6.conf.all.accept_redirects=0

net.ipv4.conf.all.send_redirects=0

net.ipv4.conf.all.accept_source_route=0
net.ipv6.conf.all.accept_source_route=0

net.ipv4.conf.all.log_martians=1
```

This enables extra security features intended for a website server. If you are using the server for other purposes you will have to see which values are right
for you. Maybe [this archwiki page](https://wiki.archlinux.org/index.php/Sysctl) can help with that.

### Keep the system up to date

You should regularly update your system, lest a new vulnerability patch shows up and you miss them. On Debian, you can configure auto updates by installing the
`unattended-upgrades` package.

```shell
apt install unattended-upgrades
```

### Finished?

These steps should provide a nice base, but there are always more things that can be done to improve security. There is no 100% safe system, so you should check
stuff as website business purpose and expected traffic to determine how far you should go with your defences. And don't forget to frequently revise and update
your security measures to stay on top of attackers.


## Setting up page

Now that the server is ready, we need to configure it so that the website content is exposed to the internet. The commands shown beneath are what I use for my
workflow, but it is certainly not the only approach available.

### Install tools

```shell
sudo apt install rsync  # For syncing the website content. Could also use something else, like git.
sudo apt install nginx  # Used to host the HTML website.
sudo apt install python-certbot-nginx  # Auto generate and renew certificates.
sudo apt install cargo  # To install agate.
sudo cargo install agate  # Server for GEMINI website.
```

### Sync files with server

```shell
# These are for the content itself.
rsync -EhmPpruvz --delete-after ./gmi/ <user@hostname>:/var/www/gmi
rsync -EhmPpruvz --delete-after ./html/ <user@hostname>:/var/www/html
# These commands should only be needed for configuration changes.
rsync -EhmPpruvz --delete-after ./nginx/sites-available/ <user@hostname>:/etc/nginx/sites-available
rsync -EhmPpruvz --delete-after ./agate/agate.service <user@hostname>:/etc/systemd/system/agate.service
```

### Set up services

```shell
# This should only need to be run once.
ssh <user@hostname> 'ln -s /etc/nginx/sites-available/website /etc/nginx/sites-enabled/website; certbot --nginx'
ssh <user@hostname> 'systemctl enable nginx; systemctl start nginx; systemctl reload nginx'
ssh <user@hostname> 'mkdir -p /var/agate/; systemctl stop agate; systemctl enable agate; systemctl start agate'
```

### Reload services

```shell
# Only needed when the configuration changes.
ssh <user@hostname> 'systemctl reload nginx; systemctl restart agate'
```

### Manually renew certificates

```shell
# This should not be needed since certbot should auto renew it anyway.
ssh <user@hostname> 'certbot certonly --nginx'
```


## Check website

You can get some info on the website after it is deployed, to help you further improve the site.

### Validate website configuration

These online tools do some audits on your website and give you feedback on how to improve them.

 * [Google lighthouse](https://developers.google.com/speed/pagespeed/insights/)
 * [Real favicon generator](https://realfavicongenerator.net/favicon_checker)

### Analyse logs

Looking at the logs can allow you to get an estimate of your website's traffic without the need of using client side code.

```shell
# On the server
sudo apt install gzip
```

```shell
# On the client
sudo apt install goaccess
./analyse <user@hostname>
```

This will generate an HTML report @ [/report.html](./report.html) (NOTE: file not version controlled).
