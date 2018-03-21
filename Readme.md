# eth-parity-simplestorage

Example using parity locally to deploy and use a simple-storage (hello world) Ethereum contract.

### Prerequisite

Parity installed and running on your system, example for OSX for parity setup & run:

    mkdir -p ~/bin
    echo 'export PATH=$PATH:~/bin' >>  ~/.bash_profile
    source ~/.bash_profile
    ln -s "/Applications/Parity Ethereum.app/Contents/MacOS/parity" ~/bin/parity
    mkdir -p ~/tmp
    parity --chain kovan account new
    # use foo as a password
    echo "foo" > ~/tmp/pass  && parity --chain kovan --password ~/tmp/pass --unlock $(parity --chain kovan account list | head -n 1)


### Setup

Run:

```
npm install
```

### Deploy contract

Run:

```
node deploy.js
```

### Test contract (setter + getter)

Run:

```
node .
```


Enjoy!

@makevoid
