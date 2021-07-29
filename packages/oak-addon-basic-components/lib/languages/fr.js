export default {
  addons: {
    basicComponents: {
      fields: {
        image: {
          add: 'Ajouter une image',
          del: 'Supprimer',
        },
        editor: {
          increase: 'Augmenter la taille',
          decrease: 'Baisser la taille',
          bold: 'Gras',
          italic: 'Italique',
          underline: 'Souligner',
          color: 'Couleur',
          left: 'Aligner à gauche',
          center: 'Aligner au centre',
          right: 'Aligner à droite',
          justify: 'Justifier',
        },
      },
      components: {
        title: {
          name: 'Titre',
          default: 'Ceci est un titre',
          settings: {
            title: 'Options de titre',
            type: {
              title: 'Type',
              value: 'Titre',
            },
            content: {
              title: 'Contenu',
            },
          },
        },
        text: {
          name: 'Texte',
          default: 'Ceci est un texte',
          settings: {
            title: 'Options de texte',
            content: {
              title: 'Contenu',
            },
          },
        },
        image: {
          name: 'Image',
          empty: 'Image vide',
          local: 'Image locale',
          settings: {
            title: 'Options d\'image',
            image: {
              title: 'Image',
              size: {
                title: 'Taille de l\'image',
                auto: 'Adaptée au contenu',
                full: 'Taille réelle',
                custom: 'Personnalisée',
                width: 'Largeur de l\'image',
                height: 'Hauteur de l\'image',
              },
            },
          },
        },
        button: {
          name: 'Bouton',
          default: 'Cliquez !',
          settings: {
            title: 'Options de bouton',
            content: {
              title: 'Contenu',
            },
            action: {
              title: 'Action',
              openLink: 'Ouvrir un lien',
              fireEvent: 'Déclencher un évènement',
            },
            url: {
              title: 'URL du lien',
            },
            event: {
              title: 'Nom de l\'évènement javascript',
            },
            type: {
              title: 'Type d\'élément HTML',
              button: 'Bouton',
              links: 'Lien',
            },
          },
        },
      },
    },
  },
};
