export const themeConfig = {
  token: {
    fontFamily: 'Manrope',
    colorPrimary: '#A1C038',
    colorText: '#ffffff',
    colorTextPlaceholder: '#ffffffa2',
    colorTextDescription: '#ffffff'
  },
  components: {
    Form: {
      labelColor: 'white',
      labelFontSize: 18,
      marginLG: 27
    },
    Select: {
      optionSelectedColor: '#21BA43',
      selectorBg: 'transparent',
      paddingContentHorizontal: 20,
      optionFontSize: 16,
      optionSelectedBg: 'rgba(0, 0, 0, 0.2)'
    },
    Message: { fontSize: 30 }
  }
}

export const formTableConfig = {
  theme: {
    token: {
      colorText: 'black',
      colorTextDescription: 'black',
      colorIcon: 'black'
    },
    components: {
      Form: {
        labelColor: 'black',
        labelFontSize: 18,
        marginLG: 27
      },
      Select: {
        optionSelectedColor: '#21BA43',
        selectorBg: 'transparent',
        paddingContentHorizontal: 20,
        optionFontSize: 16,
        optionSelectedBg: 'rgba(218, 216, 216, 0.2)'
      }
    }
  },
  wave: { disabled: true }
}
