<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
         <li><a href="#quickstart">Quickstart</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#creators">Creators</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<h3 align="center">Kalusteassari / Furniture Assistant</h3>



<!-- ABOUT THE PROJECT -->
## About The Project

Kalusteassari / Furniture Assistant was created during Haaga-Helia's Software Project 2 -course (10 ECTS) in fall 2023. It is a team project of seven students.

This project was commissioned by Nikari Oy and Woodnotes Oy. The purpose of the project was to create a mobile app where the user could utilize the camera of their device to get upkeep instructions for the furniture pictured. The app is supposed to offer a quick and easy way to find information about the furniture and give instructions on upkeep and cleaning. The main function of the app is to make it easier for furniture owners to keep their furniture long-lasting and beautiful.

On this page, you will find information and instructions on the created mobile app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- <a href="https://reactnative.dev/">ReactNative</a>
- <a href="https://www.djangoproject.com/">Django</a>



<!-- GETTING STARTED -->
## Getting Started

The app operates on both Android and iOS devices.

### Prerequisites

For the user to get the best experience, they should permit the app to use their device's camera.

### Installation

For now, the game is published only in Expo Go -application, and cannot be found in Google Play Store or App Store.

Install Expo Go on your mobile device: <a href="https://expo.dev/"></a> or simply search for 'Expo Go' in Play Store/App Store.

### ⚡️ Quickstart

To get started, follow these steps:

1. Clone the GitHub Repository: Begin by cloning the repository using the command:
   ```
   git clone https://github.com/seitseman-niksaria/niksari-frontend.git
   ```
2. Get into the project:
   ```
   cd niksari-frontend
   ```
3. Install all the dependencies:
   ```
   npm install
   ```
   
:exclamation: Keep in mind!
For the development server .env file is needed. You can download it from Teams files. Don't share it or push it to the GitHub repository!!!
Remember that it must begin with a dot and it goes into the root directory of the project.

 
4. Start the expo app:
   ```
   npx expo start
   ```
6. Scan the QR code above with Expo Go (Android) or the camera app (iOS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Here are a few views of the app in usage: the chatbot screen, asking the chatbot to provide information about a certain furniture model, and a screen for the model.

<img width="225" alt="pieni1" src="https://github.com/seitseman-niksaria/documentation/assets/122804701/f3c1234b-9286-4576-a8ab-748f670730f3"><img width="225" alt="pieni2" src="https://github.com/seitseman-niksaria/documentation/assets/122804701/af847a6e-71b5-454b-a3a3-6622696a9017"><img width="225" alt="pieni3" src="https://github.com/seitseman-niksaria/documentation/assets/122804701/a7e94604-5a01-4e42-9e23-5614f6e46687">

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

Our creation process was divided into 4 sprints (starting with sprint 0) that were all three weeks long. We started with brainstorming about the assignment, writing user stories, and creating other related charts.

Next, we created the bases for the app's backend and frontend. We started developing the chatbot and a functioning camera.

In the next sprint, we focused on how the chatbot functioned and created a small artificial intelligence using Teachable Machine so we could test and simulate the image-recognizing function.

Next, we created a proper database using PostgreSQL. We also focused on the camera application sending the picture to the recognition model and return information of the furniture. On the code side, we cleaned the code for both chatbot and frontend, and made the app conversate with the database.

In the last sprint, we mostly focused on finishing touches, mostly on the UI/UX side.

Currently, we are not planning on publishing our app. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CREATORS -->
## Creators

The app was created by (in alphabetical order):

- <a href="https://github.com/anni-ikonen">Anni Ikonen</a>
- <a href="https://github.com/SProkopios">Samu Koponen</a>
- <a href="https://github.com/JukkaLak">Jukka Lakkala</a>
- <a href="https://github.com/vilma-l">Vilma Laurila</a>
- <a href="https://github.com/adaamariaa">Ada Meriläinen</a>
- <a href="https://github.com/Suppiluliumas">Jesse Nevalainen</a>
- <a href="https://github.com/svidzger">German Svidzinskij</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

We would like to thank our teachers for their continuous support and advice during this project. We would also like to thank our fellow students in team <a href="https://github.com/Furniture-Fashioner-Team/furniture-fashioner-app-android">Furniture Fashioner</a> for their valuable comments in code reviews.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

This work is licensed under The MIT Licence.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
