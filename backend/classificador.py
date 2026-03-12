import os
os.environ['TF_USE_LEGACY_KERAS'] = '1'

import cv2
import numpy as np
import tensorflow as tf
from tf_keras.models import load_model


class DogBreedClassifier:
    """Classificador de raças de cachorros usando modelo de deep learning."""
    
    CLASS_NAMES = [
        "beagle", "boxer", "chihuahua", "corgi", "dachshund", "french_bulldog",
        "german_shepherd", "golden_retriever", "husky", "pomeranian", "poodle",
        "pug", "rottweiler", "shiba_inu", "shih_tzu", "yorkshire_terrier"
    ]
    
    def __init__(self, model_path='best_model.h5'):
        """
        Inicializa o classificador carregando o modelo.
        
        Args:
            model_path: Caminho para o arquivo do modelo .h5
        """
        self.model = load_model(model_path)
        self.input_size = (224, 224)
    
    def preprocess_image(self, img_path):
        """
        Preprocessa uma imagem para o modelo de classificação.
        
        Args:
            img_path: Caminho completo para a imagem
            
        Returns:
            Imagem preprocessada com shape (224, 224, 3) e valores entre 0 e 1
        """
        img = cv2.imread(img_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_resize = tf.image.resize(img, self.input_size).numpy().astype(float) / 255
        return img_resize
    
    def classify(self, processed_img):
        """
        Classifica uma imagem já preprocessada.
        
        Args:
            processed_img: Imagem preprocessada com shape (224, 224, 3)
            
        Returns:
            Nome da raça do cachorro identificada
        """
        img_batch = np.expand_dims(processed_img, axis=0)
        prediction = self.model.predict(img_batch)
        class_index = np.argmax(prediction)
        return self.CLASS_NAMES[class_index]
    
    def predict(self, img_path):
        """
        Processa e classifica uma imagem em um único passo.
        
        Args:
            img_path: Caminho completo para a imagem
            
        Returns:
            Nome da raça do cachorro identificada
        """
        processed_img = self.preprocess_image(img_path)
        return self.classify(processed_img)
