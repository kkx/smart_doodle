# Smart Doodle

Smart Doodle is an ethereum blockchain based poll application demo. The idea of smart doodle is to help newbees like me to understand how to build a dapp.

Smart Doodle is a backend-free, on blockchan, free-sql-storage, reactjs powered app, currently is running on the github page using Ethereum testnet.


### Installation

You can install this app in you local environment:

```sh

git clone https://github.com/kkx/smart_doodle.git

cd smart_doodle

npm install

npm start

```

You can also test it online using our demo(You will need a ethereum browser like mist or chrome plugin metamask to get a lightwight ethereum client, otherwise you must run you ehtereum client locally using the port 8545):

  - visit https://kkx.github.io/smart_doodle/#/ (demo running on the **testnet ropsten**)


### Project description

This is just a very basic voting app with a bit of web ui.

Once you dapp is loaded in your browser you can perform 3 types of actions with following restrictions:

  - create a poll event

    - One user/account/address can only host 1 poll event in the sametime, the address of the poll event is the host account address

    - User can recreate event anytime he wants to, the previous poll event would be removed.

    - A poll event can have as maximun 10 options by now

  - search a poll event 

    - search a poll by introducing host address

  - vote on a poll

    - User can vote a poll only once, and the poll history would be recorded


### Tech

This project is based on following tech stack:

* react

* material-ul

* react-redux

* [react-redux-material_ui-boilerplate](https://github.com/takanabe/react-redux-material_ui-boilerplate): Helped me to get started quickly with these 3 tools above.

* truffle 



### How to create the contract

It is dead simple thanks to [truffle](https://github.com/trufflesuite/truffle), 

```sh

truffle compile

truffle migrate(truffle migrate --reset)

```

Make sure you have your cliente node started before running these comands. In the development, testprc is recommended.


### Tricky part of buiding dapps which i learned through this project 

- Solidity does not support to return a dynamic array o structure

- you can not clear the whole mapping unless you know all the keys, in such usecase you should use an array to track things.

- metamask injects the web3 object after the page is fully loaded, you need to avoid to perform any blockchain related operation until the web3 object is injected. In my case i had to force js loading after the html loaded completely.

    - ```

        <script type="text/javascript">

          function downloadJSAtOnload() {

              var element = document.createElement("script");

              element.src = "/smart_doodle/static/bundle.js";

              document.body.appendChild(element);

          }

          if (window.addEventListener)

              window.addEventListener("load", downloadJSAtOnload, false);

          else if (window.attachEvent)

              window.attachEvent("onload", downloadJSAtOnload);

          else window.onload = downloadJSAtOnload;

        </script>

      ```

 - As pointed out in [metamask documentation](https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#dizzy-all-async---think-of-metamask-as-a-light-client), all blockchain operations must be **asynchronous** with some exceptions. This can be troublesome for frontend newbee like me.


 ### Conclusion

IMO Dapp is like a normal app with the particularity of having a shared database which is online always. Your operations in this app is asynchronous and expensive :D, but it is middleman-free!  
