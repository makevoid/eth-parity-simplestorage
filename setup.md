# OSX Setup

### Download and Install Parity 

- Go to: https://github.com/paritytech/parity/releases
- download and install latest parity for MacOS (pkg) - example: parity_1.9.5_macos_macos.pkg

### Run Parity, switch to Kovan

when it's installed then start parity and then:

- go to this url http://127.0.0.1:8180/#/v1
- then go into Settings, then Parity, and select: `Parity syncs to the Kovan test network` from the select box

it will take some time but you will be in sync with the Kovan test network

- check that your latest block is in sync with the one on the Kovan chain displayed by a Kovan block explorer (ex etherscan: https://kovan.etherscan.io - at the time of writing we're almost at the 7th million block)

https://slack-files.com/T074E6ACQ-F9UT7DTFZ-7a093cd38d

syncing Kovan requires some CPU (your machine will slow down a bit), but it shouldn't take long (max 10m)

### Create an Ethereum Account

- go to the Accounts section
- click on + account
- New Account, then select Next
- account name: main
- password: foo (leave foo for testnet account, I recommend it)
- copy to your clipboard the 12 words phrase
- paste the 12 words phrase in the next screen
- copy your account address ( mine looks like 0x0000afFA3E801e11Fb5355a01047A64c9425aF67 )

### Get some Kovan ethers

- head over the Kovan faucet gitter chat: https://gitter.im/kovan-testnet/faucet
- log in via github, paste your Ethereum Parity Wallet Kovan address in the chat and you will receive ethers soon (few minutes, from the bot)

### Install SolC compiler:

```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
brew linkapps solidity
```

(which are the commands written in the docs: http://solidity.readthedocs.io/en/v0.4.21/installing-solidity.html#binary-packages )

### Kill Parity

```ps ax  | grep parity```

find the parity PID

```kill -9 PID```

### Set up Parity via command line

run this altogether, command by command or customize it if you want:

this just adds a symlink for `parity` to your home's `~/bin`, adds ~/bin to your path

```
cd $HOME
ln -s $HOME/Library/Application\ Support/io.parity.ethereum parity
mkdir -p ~/bin
echo 'export PATH=$PATH:~/bin' >>  ~/.bash_profile 
source ~/.bash_profile
ln -s "/Applications/Parity Ethereum.app/Contents/MacOS/parity" ~/bin/parity
mkdir -p ~/tmp
```

this starts parity unlocking your main account

```
echo "foo" > ~/tmp/pass  && parity --chain kovan --password ~/tmp/pass --unlock $(parity --chain kovan account list | head -n 1) 
```
