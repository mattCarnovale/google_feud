<h1 align="center">
  Google Survey Says
</ h1>
<h3 align="center">  
  A game where Family Feud and Google search suggestion collide.  <br /> 
</h3>
<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/aur/license/yaourt.svg"></a>
</p>

## About
Google Survey Says is a game that plays like Family Feud, but the survey responses are informed by the suggestions generated when you provide input to the Google search bar.  This game was implementated as a means to explore some of the frontend technologies discussed in a web development class and is based on the game <a href="http://www.googlefeud.com/">Google Feud</a> by Justin Hook.

## Getting Started

### Prerequistes

Install **Node.js** by following <a href="https://nodejs.org/en/">these instructions</a>.

Follow <a href="https://www.npmjs.com/get-npm">these instructions</a> to install **npm**.

### Installation

1. Clone the repository to your local machine with: <br />
`git clone https://github.com/mattCarnovale/google_feud.git`

  *Alternative: download the zip of the project.*

2. Navigate to the project directory and install dependencies with the command: <br />
`npm install`

### Usage

1. Using a command line tool, navigate to the project directory and execute the command: <br />
`node game_sever.js`

2. Open a browser and navigate to: <br />
`http://localhost:<open port>/game_client.html`
*Note: <open port> should be replaced with a port that is not in use on your machine, typically this is something like `8080`*

## Built With
* css
* <a href="https://jquery.com/">jQuery</a>
* <a href="https://nodejs.org/en/about/">Node.js</a>
* <a href="https://expressjs.com/">express</a>
* <a href="https://www.npmjs.com/package/suggestion">suggestion</a> 
