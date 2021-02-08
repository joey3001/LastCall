# <span style="color:#0ec2b8">_Last Call_</span>

#### _Last Call 

#### By _**Joseph Nero, Eric Endsley, Agata Kolodziej, Constantine Yakubovski, Nataliya Zhuravleva**_

## <span style="color:#0ec2b8">Description</span>

_The Last Call website helps people to know more about beer and finds breweries nearby. <br>
The website contains the following pages:_

1. _Age verification_ - It checks the user age. User must be 21 years or older.
2. _Beer 101_ - This is informational page about beer history, how beer is made, ingredients, key beer terms, types of beer.
3. _Brewery Finder_ - This page queries three API's (google maps, mapquest, Beermapping) to provide a sorted list of breweries within a specified search radius from the user's address. Links to google maps directions are also automatically generated on this page. 4
    * To use this feature, navigate to the breweryfinder.html page by clicking "Find Beer" in the upper left hand corner of the webpage. 
    * Enter your desired search radius and your address and click submit. 

## <span style="color:#0ec2b8">Setup/Installation Requirements</span>

1. A web browser to view the website. I recommend Google Chrome.
2. Git Bash (or another terminal program) & Git.  
    - To clone the repository from Github using git commands in the terminal, you need a terminal program & Git. For Windows OS, I recommend the Git Bash terminal program. Installing Git Bash will also install Git. 
3. VSCode (or another code editor)
    - To view/edit this code, you need a code editor. I recommend VSCode. 
4. Node.js 
    - Node.js is a javascript runtime environment that you need to use npm, the preferred package manager for this application. You can download it at [this link](https://nodejs.org/en/download/)
5. Detailed instructions to install Git Bash & VSCode can be found in the Setup/Installation Requirements section of the README for [this repo.](https://github.com/joey3001/first-friday-project)

### <span style="color:#c4f4ef">View Online</span>

_Visit [Last Call webpage](https://joey3001.github.io/LastCall/) at https://joey3001.github.io/LastCall/_ to view application on GitHub pages.\_

### <span style="color:#c4f4ef">Open Locally</span>

1. _Navigate to the [Last Call repo](https://github.com/joey3001/LastCall) at https://github.com/joey3001/LastCall_ to view the project files and commits.
2. _Click on the green button labeled "Code"_ to copy repository URL.
3. _Clone the repository to your local machine_ by opening your machine terminal and using the command "git clone https://github.com/joey3001/LastCall".
4. _Create API Keys (see instruction below)_
5. _Place your tokens in an .env file at the top level of your directory. Name your API key variables API_KEY and API_KEY2 in .env. Assign your "Beer Mapping" API Key to the variable named "API_KEY" and assign your "Mapquest" API key to the variable named API_KEY2. Keep spelling and capitalization identical as shown below: 

            e.g. API_KEY=your Beer Mapping API Key
            e.g. API_KEY2=your Mapquest API Key

6. Include .env in .gitignore file.

### <span style="color:#c4f4ef">Creating API Key</span>

_To use this application, you will need to make two accounts and get an API keys. The "Free Plan" for the mapquest API allows for 1500 API calls per month. The Beer Mapping API is does not limit the number of API calls you can make with their "Free Plan."_ 

1. __Visit the [Beer Mapping API Site](https://beermapping.com/api/). Click on the "Sign Up" Button and create an account._
2. _At this point, you'll be able to access a dashboard that includes your API key._
3. Set your beer mapping API key to a variable name "API_KEY" in  your .env file as shown below: 

            API_KEY=12312312jlsfajsdiofjo

4. _Visit the [Mapquest API Site](https://developer.mapquest.com/). Click on the "Get your Free API Key" Button and create an account._
5. _At this point, you'll be able to access a dashboard that includes your API key as well as your remaining API calls for the month._
6. Set your mapquest API key to a variable name "API_KEY2" in  your .env file as shown below: 

            API_KEY2=fdagaddga123123sfajsdiofjo

### <span style="color:#c4f4ef">Installing neccesary packages & opening the project locally</span>

1. Make sure you've downloaded Node.js. If you haven't, you can download it at [this link](https://nodejs.org/en/download/) 

2. Make sure you've downloaded Node.js. If you haven't, you can download it at [this link](https://nodejs.org/en/download/)

3. Use the cd command to enter the cloned directory. Once you are within the cloned directory, enter the following command into your terminal to install the project's required packages : 

            npm install

4. Enter the following command into your terminal to build the project using the npm package manager : 

            npm run build

5. Enter the following command to start a dev server which will run the project : 

            npm run start

## <span style="color:#0ec2b8">Known Bugs</span>

_Location page doesn't show information about breweries in WA, FL, due to broken API Endpoints_
_This bag was made known to the API developers_

## <span style="color:#0ec2b8">Support and contact details</span>

_If you have any questions, ideas or concerns, please, contact us by email:_ 
Joseph Nero at [josephnero111@gmail.com](mailto:josephnero111@gmail.com)<br>
Eric Endsley at [eric.endsley4@gmail.com](mailto:eric.endsley4@gmail.com)<br>
Agata Kolodziej at [agatakolohe@gmail.com](mailto:agatakolohe@gmail.com)<br>
Joseph Nero at [josephnero111@gmail.com](mailto:josephnero111@gmail.com)<br>
Constantine Yakubovski at [faustlarsen@gmail.com](mailto:faustlarsen@gmail.com)<br>
Nataliya Zhuravleva at [natalindria@gmail.com](mailto:natalindria@gmail.com)<br>

## <span style="color:#0ec2b8">Technologies Used</span>

- _VisualStudio Code_
- _Git_
- _GitHub_
- _HTML/CSS/Bootstrap_
- _JavaScript/jQuery_
- _Mapquest API
- _Webpack_
- _Node_
- _Npm_
- _ESLint_
- _Jest_

### <span style="color:#0ec2b8">License</span>

_This software is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license_

Copyright (c) 2020 **_Joseph Nero, Eric Endsley, Agata Kolodziej,  Constantine Yakubovski, Nataliya Zhuravleva_**
