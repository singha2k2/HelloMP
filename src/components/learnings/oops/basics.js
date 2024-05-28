import React, { useState, useEffect } from "react";
import { images } from "./images";
import "./basics.css";
import QuizCard from "./quiz";
import ProgressBar from "../ui/progressBar";
import NavbarComponent from "../../navbar/navbar";
import Chatbot from "../../Dashboard/Chatbot";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 

function HiddenBlockWithContent({ blockTitle }) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid white",
        borderRadius: "12px",
        color: "white",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <h5>{blockTitle}</h5>
    </div>
  );
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();


  const slideTexts = {
    // "hi": [
    //   {
    //     text: "स्लाइड 1 में आपका स्वागत है। यह हमारे विषय का परिचय है।",
    //     lang: "hi",
    //   },
    //   {
    //     text: "स्लाइड 1 में आपका स्वागत है। यह हमारे विषय का परिचय है।",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Why Oops ? 1. OOP is faster and easier to execute      ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "2. OOP provides a clear structure for the programs      ",
    //     lang: "hi",
    //   },

    //   {
    //     text: '3. OOP helps to keep the Java code DRY "Don\'t Repeat Yourself" ',
    //     lang: "hi",
    //   },
    //   {
    //     text: "4. OOP makes it possible to create full reusable applications      ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Don't Repeat Yourself\" (DRY) principle reducing the repetition of code Consider an example of Sum function which returns the sum of two numbers",
    //     lang: "hi",
    //   },
    //   { text: "Lets Implement a Sum with Program One", lang: "hi" },
    //   {
    //     text: "and then Implement a Sum with Program two but with same logic      ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "and then with Program three but with same logic      ",
    //     lang: "hi",
    //   },

    //   {
    //     text: "writing same function for different Programs Again and Again make code redundant",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Now Write a Central Sum function and Use in Program 1      ",
    //     lang: "hi",
    //   },
    //   { text: "in Program 2      ", lang: "hi" },
    //   {
    //     text: "in Program 3 .. this concept is used as a base concept of oops      ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Classes Concept : Classes are like blueprints for objects. ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Object Concept : Objects are individual instances of a class. ",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Classes define the properties (like color, size) and behaviors (like turning on) that objects of that class will have.",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Objects hold specific values for the properties defined in the class.",
    //     lang: "hi",
    //   },
    //   {
    //     text: "Think of a class as a cookie cutter for making cookies. Each cookie (object) made with the cutter will have the same general shape, but can have different details.",
    //     lang: "hi",
    //   },
    //   {
    //     text: 'So, you can have a class "Car" and many objects like "RedFerrari" or "BlueTruck", each with their own color but sharing car properties.',
    //     lang: "hi",
    //   },
    //   {
    //     text: "Data Members: These are variables inside a class that define the state of an object. ",
    //     lang: "hi",
    //   },
    //   {
    //     text: 'Imagine them as the features of the blueprint, like "color" or "speed" for a car.',
    //     lang: "hi",
    //   },
    //   {
    //     text: "Member Functions: These are functions defined within a class that act on the data members. ",
    //     lang: "hi",
    //   },
    //   {
    //     text: 'They represent the actions the object can perform, like "accelerate" or "brake" for the car. ',
    //     lang: "hi",
    //   },
    //   {
    //     text: "Now Lets CREATE A CLASS. Start with Access Modifier (Who can access the class) .. these are public,private,protected or default",
    //     lang: "hi",
    //   },
    //   { text: "write a class Keyword", lang: "hi" },
    //   { text: "write a class name in this case it is Main", lang: "hi" },
    //   { text: "Variables are known as Attributes", lang: "hi" },
    //   { text: "This is how we create a method in a class", lang: "hi" },
    //   {
    //     text: "Now Practice Question : Create a class named car with  two data members - weight and color and one method drive",
    //     lang: "hi",
    //   },
    // ],
    "es-ES": [
      {
        "text": "¡Bienvenidos a la primera diapositiva! Aprendamos los conceptos de POO donde POO significa Programación Orientada a Objetos",
        "lang": "es-ES"
      },
      {
        "text": "Comencemos con un hecho que la S en POO significa ... ¿Sistema o Herencia Estructurada?",
        "lang": "es-ES"
      },
      {
        "text": "¿Por qué POO? 1. La POO es más rápida y fácil de ejecutar",
        "lang": "es-ES"
      },
      {
        "text": "2. La POO proporciona una estructura clara para los programas",
        "lang": "es-ES"
      },
      {
        "text": "3. La POO ayuda a mantener el código Java DRY \"Don't Repeat Yourself\" (No te repitas)",
        "lang": "es-ES"
      },
      {
        "text": "4. La POO permite crear aplicaciones completamente reutilizables",
        "lang": "es-ES"
      },
      {
        "text": "El principio \"Don't Repeat Yourself\" (DRY) reduce la repetición del código. Consideremos un ejemplo de una función Suma que devuelve la suma de dos números",
        "lang": "es-ES"
      },
      {
        "text": "Implementemos una suma con el Programa Uno",
        "lang": "es-ES"
      },
      {
        "text": "luego implementemos una suma con el Programa Dos pero con la misma lógica",
        "lang": "es-ES"
      },
      {
        "text": "y luego con el Programa Tres pero con la misma lógica",
        "lang": "es-ES"
      },
      {
        "text": "escribir la misma función para diferentes programas una y otra vez hace que el código sea redundante",
        "lang": "es-ES"
      },
      {
        "text": "Ahora, escriba una función Suma central y utilícela en el Programa 1",
        "lang": "es-ES"
      },
      {
        "text": "en el Programa 2",
        "lang": "es-ES"
      },
      {
        "text": "en el Programa 3 .. este concepto se usa como base de la POO",
        "lang": "es-ES"
      },
      {
        "text": "Concepto de Clases: Las clases son como planos para los objetos.",
        "lang": "es-ES"
      },
      {
        "text": "Concepto de Objetos: Los objetos son instancias individuales de una clase.",
        "lang": "es-ES"
      },
      {
        "text": "Las clases definen las propiedades (como color, tamaño) y comportamientos (como encender) que los objetos de esa clase tendrán.",
        "lang": "es-ES"
      },
      {
        "text": "Los objetos tienen valores específicos para las propiedades definidas en la clase.",
        "lang": "es-ES"
      },
      {
        "text": "Piense en una clase como un cortador de galletas para hacer galletas. Cada galleta (objeto) hecha con el cortador tendrá la misma forma general, pero puede tener detalles diferentes.",
        "lang": "es-ES"
      },
      {
        "text": "Entonces, puedes tener una clase \"Coche\" y muchos objetos como \"FerrariRojo\" o \"CamionAzul\", cada uno con su propio color pero compartiendo las propiedades del coche.",
        "lang": "es-ES"
      },
      {
        "text": "Miembros de Datos: Son variables dentro de una clase que definen el estado de un objeto.",
        "lang": "es-ES"
      },
      {
        "text": "Imagínelos como las características del plano, como \"color\" o \"velocidad\" para un coche.",
        "lang": "es-ES"
      },
      {
        "text": "Funciones Miembro: Son funciones definidas dentro de una clase que actúan sobre los miembros de datos.",
        "lang": "es-ES"
      },
      {
        "text": "Representan las acciones que el objeto puede realizar, como \"acelerar\" o \"frenar\" para el coche.",
        "lang": "es-ES"
      },
      {
        "text": "Ahora, creemos una CLASE. Comience con el Modificador de Acceso (quién puede acceder a la clase) .. estos son public, private, protected o por defecto",
        "lang": "es-ES"
      },
      {
        "text": "escriba una palabra clave class",
        "lang": "es-ES"
      },
      {
        "text": "escriba un nombre de clase, en este caso es Main",
        "lang": "es-ES"
      },
      {
        "text": "Las variables se conocen como atributos",
        "lang": "es-ES"
      },
      {
        "text": "Así es como creamos un método en una clase",
        "lang": "es-ES"
      },
      {
        "text": "Pregunta de práctica: Cree una clase llamada coche con dos miembros de datos - peso y color y un método conducir",
        "lang": "es-ES"
      }
    ],
    
      "fr-FR": [
        {
          "text": "Bienvenue à la première diapositive !! Apprenons les concepts de la POO où POO signifie Programmation Orientée Objet",
          "lang": "fr-FR"
        },
        {
          "text": "Commençons par un fait que le S dans POO signifie ... ? Système ou Héritage Structuré",
          "lang": "fr-FR"
        },
        {
          "text": "Pourquoi la POO ? 1. La POO est plus rapide et plus facile à exécuter",
          "lang": "fr-FR"
        },
        {
          "text": "2. La POO fournit une structure claire pour les programmes",
          "lang": "fr-FR"
        },
        {
          "text": "3. La POO aide à garder le code Java DRY \"Don't Repeat Yourself\" (Ne vous répétez pas)",
          "lang": "fr-FR"
        },
        {
          "text": "4. La POO permet de créer des applications entièrement réutilisables",
          "lang": "fr-FR"
        },
        {
          "text": "Le principe \"Don't Repeat Yourself\" (DRY) réduit la répétition du code. Considérons un exemple de fonction Somme qui renvoie la somme de deux nombres",
          "lang": "fr-FR"
        },
        {
          "text": "Implémentons une somme avec le Programme Un",
          "lang": "fr-FR"
        },
        {
          "text": "puis implémentons une somme avec le Programme Deux mais avec la même logique",
          "lang": "fr-FR"
        },
        {
          "text": "et ensuite avec le Programme Trois mais avec la même logique",
          "lang": "fr-FR"
        },
        {
          "text": "écrire la même fonction pour différents programmes encore et encore rend le code redondant",
          "lang": "fr-FR"
        },
        {
          "text": "Maintenant, écrivez une fonction Somme centrale et utilisez-la dans le Programme 1",
          "lang": "fr-FR"
        },
        {
          "text": "dans le Programme 2",
          "lang": "fr-FR"
        },
        {
          "text": "dans le Programme 3 .. ce concept est utilisé comme base de la POO",
          "lang": "fr-FR"
        },
        {
          "text": "Concept des Classes : Les classes sont comme des plans pour les objets.",
          "lang": "fr-FR"
        },
        {
          "text": "Concept des Objets : Les objets sont des instances individuelles d'une classe.",
          "lang": "fr-FR"
        },
        {
          "text": "Les classes définissent les propriétés (comme la couleur, la taille) et les comportements (comme allumer) que les objets de cette classe auront.",
          "lang": "fr-FR"
        },
        {
          "text": "Les objets détiennent des valeurs spécifiques pour les propriétés définies dans la classe.",
          "lang": "fr-FR"
        },
        {
          "text": "Pensez à une classe comme un emporte-pièce pour faire des biscuits. Chaque biscuit (objet) fait avec l'emporte-pièce aura la même forme générale, mais peut avoir des détails différents.",
          "lang": "fr-FR"
        },
        {
          "text": "Donc, vous pouvez avoir une classe \"Voiture\" et plusieurs objets comme \"FerrariRouge\" ou \"CamionBleu\", chacun avec sa propre couleur mais partageant les propriétés de la voiture.",
          "lang": "fr-FR"
        },
        {
          "text": "Membres de Données : Ce sont des variables à l'intérieur d'une classe qui définissent l'état d'un objet.",
          "lang": "fr-FR"
        },
        {
          "text": "Imaginez-les comme les caractéristiques du plan, comme \"couleur\" ou \"vitesse\" pour une voiture.",
          "lang": "fr-FR"
        },
        {
          "text": "Fonctions Membre : Ce sont des fonctions définies dans une classe qui agissent sur les membres de données.",
          "lang": "fr-FR"
        },
        {
          "text": "Elles représentent les actions que l'objet peut effectuer, comme \"accélérer\" ou \"freiner\" pour la voiture.",
          "lang": "fr-FR"
        },
        {
          "text": "Maintenant, créons une CLASSE. Commencez par le Modificateur d'Accès (qui peut accéder à la classe) .. ceux-ci sont public, private, protected ou par défaut",
          "lang": "fr-FR"
        },
        {
          "text": "écrivez un mot-clé class",
          "lang": "fr-FR"
        },
        {
          "text": "écrivez un nom de classe, dans ce cas, il s'agit de Main",
          "lang": "fr-FR"
        },
        {
          "text": "Les variables sont connues sous le nom d'attributs",
          "lang": "fr-FR"
        },
        {
          "text": "Voici comment nous créons une méthode dans une classe",
          "lang": "fr-FR"
        },
        {
          "text": "Question de pratique : Créez une classe nommée voiture avec deux membres de données - poids et couleur et une méthode conduire",
          "lang": "fr-FR"
        }
      ]
    ,
    
    "en-US": [
      {
        text: "Welcome to Slide One !! Lets Learn Oops Concepts where Oops Stands for Object Oriented Programming",
        lang: "fr-FR",
      },
      {
        text: "Lets Start with a Fact that the S in Oops Stands for ... ? System or Structured Inheritance ",
        lang: "fr-FR",
      },
      {
        text: "Why Oops ? 1. OOP is faster and easier to execute      ",
        lang: "fr-FR",
      },
      {
        text: "2. OOP provides a clear structure for the programs      ",
        lang: "fr-FR",
      },

      {
        text: '3. OOP helps to keep the Java code DRY "Don\'t Repeat Yourself" ',
        lang: "fr-FR",
      },
      {
        text: "4. OOP makes it possible to create full reusable applications      ",
        lang: "fr-FR",
      },
      {
        text: "Don't Repeat Yourself\" (DRY) principle reducing the repetition of code Consider an example of Sum function which returns the sum of two numbers",
        lang: "fr-FR",
      },
      { text: "Lets Implement a Sum with Program One", lang: "fr-FR" },
      {
        text: "and then Implement a Sum with Program two but with same logic      ",
        lang: "fr-FR",
      },
      {
        text: "and then with Program three but with same logic      ",
        lang: "fr-FR",
      },

      {
        text: "writing same function for different Programs Again and Again make code redundant",
        lang: "fr-FR",
      },
      {
        text: "Now Write a Central Sum function and Use in Program 1      ",
        lang: "fr-FR",
      },
      { text: "in Program 2      ", lang: "fr-FR" },
      {
        text: "in Program 3 .. this concept is used as a base concept of oops      ",
        lang: "fr-FR",
      },
      {
        text: "Classes Concept : Classes are like blueprints for objects. ",
        lang: "fr-FR",
      },
      {
        text: "Object Concept : Objects are individual instances of a class. ",
        lang: "fr-FR",
      },
      {
        text: "Classes define the properties (like color, size) and behaviors (like turning on) that objects of that class will have.",
        lang: "fr-FR",
      },
      {
        text: "Objects hold specific values for the properties defined in the class.",
        lang: "fr-FR",
      },
      {
        text: "Think of a class as a cookie cutter for making cookies. Each cookie (object) made with the cutter will have the same general shape, but can have different details.",
        lang: "fr-FR",
      },
      {
        text: 'So, you can have a class "Car" and many objects like "RedFerrari" or "BlueTruck", each with their own color but sharing car properties.',
        lang: "fr-FR",
      },
      {
        text: "Data Members: These are variables inside a class that define the state of an object. ",
        lang: "fr-FR",
      },
      {
        text: 'Imagine them as the features of the blueprint, like "color" or "speed" for a car.',
        lang: "fr-FR",
      },
      {
        text: "Member Functions: These are functions defined within a class that act on the data members. ",
        lang: "fr-FR",
      },
      {
        text: 'They represent the actions the object can perform, like "accelerate" or "brake" for the car. ',
        lang: "fr-FR",
      },
      {
        text: "Now Lets CREATE A CLASS. Start with Access Modifier (Who can access the class) .. these are public,private,protected or default",
        lang: "fr-FR",
      },
      { text: "write a class Keyword", lang: "fr-FR" },
      { text: "write a class name in this case it is Main", lang: "fr-FR" },
      { text: "Variables are known as Attributes", lang: "fr-FR" },
      { text: "This is how we create a method in a class", lang: "fr-FR" },
      {
        text: "Now Practice Question : Create a class named car with  two data members - weight and color and one method drive",
        lang: "fr-FR",
      },
    ],
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowModal(false);
  };

  const goToNextImage = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const goToPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const toggleQuiz = () => {
    if (currentIndex === images.length) {
      setShowQuiz(true);
    }
    goToNextImage();
  };

  const currentImage = images[currentIndex];
  const currentTextObj = selectedLanguage
    ? slideTexts[selectedLanguage][currentIndex]
    : null;

  useEffect(() => {
    if (selectedLanguage && currentTextObj) {
      const voices = speechSynthesis.getVoices();
      let voice = voices.find(
        (voice) =>
          voice.lang === currentTextObj.lang && voice.name.includes("Female")
      );

      if (!voice) {
        voice = voices.find((voice) => voice.name.includes("Female"));
      }

      const utterance = new SpeechSynthesisUtterance(currentTextObj.text);
      utterance.voice = voice;
      utterance.lang = currentTextObj.lang;
      speechSynthesis.speak(utterance);
    }
  }, [currentIndex, currentTextObj, selectedLanguage]);

  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="fullscreen">
        <ProgressBar currentIndex={currentIndex} totalImages={images.length} />
    
        <div className="course-view d-flex">
          <div className="d-flex flex-column" style={{marginTop: "20px",
    marginLeft: "125px",
    height: "80%"}}> 
          <div className="image-container">
            <img src={currentImage} alt={`Slide ${currentIndex + 1}`} />
            
            {showQuiz && (
              <QuizCard
                question="What is the capital of France?"
                options={["Paris", "London", "Berlin"]}
                onNextClick={goToNextImage}
              />
            )}
            
          </div>
          <div className="transcript pt-5 px-5">
              <i className="transcript-text text text-light">
          {currentTextObj && currentTextObj.text}</i>
              <hr className="transcript-line" />
            </div>
            </div>
          <div className="discuss-doubts">
            <HiddenBlockWithContent blockTitle={"Ask Personal Assistant"} />
            <Chatbot />
          </div>
        </div>
       
        <div className="button-container">
          {!showQuiz && (
            <>
              <button
                className={currentIndex === 0 ? "hidebutton" : "prev-button"}
                onClick={goToPreviousImage}
              >
                Previous
              </button>
              <button
                className={
                  currentIndex === images.length - 1
                    ? "hidebutton"
                    : "next-button"
                }
                onClick={toggleQuiz}
              >
                Next
              </button>
    
              <button
                className={
                  currentIndex === images.length - 1
                    ? "next-button"
                    : "hidebutton"
                }
                onClick={() => navigate("/learn-with-interaction")}
              >
                {currentIndex === images.length - 1 ? "Proceed" : "Next"}
              </button>
              
            </>
          )}
        </div>
      </div>
    
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Language</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-4">
          <Button onClick={() => handleLanguageSelect("es-ES")}>Spanish</Button>
          <Button onClick={() => handleLanguageSelect("fr-FR")}>French</Button>
          <Button onClick={() => handleLanguageSelect("en-US")}>English</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;