import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
} from '@material-ui/core'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Create from '@material-ui/icons/Create'
import Table from '../../components/Table/Table.js'
import SearchIcon from '@material-ui/icons/Search'
import { useState, useEffect } from 'react'
import { useAllServiceTypes } from '../../hooks/useServiceType.js'
import {
  saveImageToFirebase,
  updateToFirebase,
  deleteImageFromFirebase,
} from '../../services/saveToFirebase.js'
import saveToFirebase from '../../services/saveToFirebase.js'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}

const useStyles = makeStyles(styles)

export default function ServiceTypes(props) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [search, setSearch] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const [serviceType, setServiceType] = useState({
    id: '',
    color: '#000',
    serviceType: '',
    imgUrl: '',
  })
  const [list, setList] = useState([])
  const { serviceTypes, isReload } = useAllServiceTypes()

  const manageEdit = (id) => {
    setServiceType(serviceTypes[id])
    setIsUpdating(true)
    setIsImage(true)
    setIsReady(true)
  }

  const handleSearch = () => (e) => {
    let searchValue = e.target.value
    setSearch(searchValue)
    if (searchValue.length > 0 || searchValue !== '') {
      let newList = []
      list.forEach((value) => {
        console.log(value[0])
        if (value[0].includes(searchValue)) {
          newList.push(value)
        }
      })
      setList(newList)
    } else {
      isReload()
    }
  }

  const validateForm = () => {
    if (
      serviceType.color.length > 3 &&
      serviceType.color.length < 8 &&
      serviceType.serviceType.length > 2 &&
      isImage
    ) {
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }

  const submitServiceType = () => {
    if (isReady) {
      saveToFirebase('ServiceTypes', serviceType)
      setServiceType({
        id: '',
        color: '#000',
        serviceType: '',
        imgUrl: '',
      })
      isReload()
      setIsImage(false)
      validateForm()
    }
  }

  const submitEdit = () => {
    if (isReady) {
      updateToFirebase('ServiceTypes', serviceType)
      cleanForm()
      isReload()
      setIsUpdating(false)
      setIsImage(false)
      validateForm()
    }
  }
  const colorOnChange = (props) => (e) => {
    let value = e.target.value
    switch (props) {
      case 'color':
        if (!value.match('#')) {
          value = '#' + value
        }
        if (value.length >= 1 && value.length < 8) {
          setServiceType({ ...serviceType, [props]: value.toUpperCase() })
        }
        break
      default:
        setServiceType({ ...serviceType, [props]: value })
        break
    }
    validateForm()
  }

  const cleanForm = () => {
    setServiceType({
      id: '',
      color: '#000',
      serviceType: '',
      imgUrl: '',
    })
  }

  const setImage = (url) => {
    setServiceType({ ...serviceType, imgUrl: url })
    setIsImage(true)
  }

  const imageOnChange = (e) => {
    let file = e.target.files[0]
    if (serviceType.imgUrl) {
      deleteImageFromFirebase(serviceType.imgUrl)
    }
    saveImageToFirebase('/icons', file, setImage)
  }

  useEffect(() => {
    let newList = []

    newList = serviceTypes.map((value, index) => {
      return [
        value.serviceType,

        <GridContainer justify='center'>
          <GridItem justify='center'>
            <img
              src={value.imgUrl}
              alt={value.serviceType}
              className='preview-image'
            />
          </GridItem>
        </GridContainer>,
        value.color,
        <GridItem
          style={{
            background: value.color,
            color: value.color,
            border: '2px solid #000',
          }}
        >
          _
        </GridItem>,
        <IconButton
          color='primary'
          aria-label='add to shopping cart'
          onClick={() => manageEdit(index)}
        >
          <Create />
        </IconButton>,
      ]
    })
    setList(newList)
  }, [serviceTypes])

  const classes = useStyles()
  return (
    <div>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Crear Tipo de Servicio</h4>
              <p className={classes.cardCategoryWhite}>
                Ingrese la informacion de un nuevo tipo de servicio
              </p>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Nombre'
                    id='Nombre'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: serviceType.serviceType,
                      onChange: colorOnChange('serviceType'),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Color'
                    id='Color'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: serviceType.color,
                      onChange: colorOnChange('color'),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <input
                    accept='image/png'
                    className={{ display: 'none' }}
                    id='contained-button-file'
                    type='file'
                    hidden
                    onChange={imageOnChange}
                  />
                  <label htmlFor='contained-button-file'>
                    <Button
                      variant='contained'
                      component='span'
                      styles={{ background: '#00acc2' }}
                    >
                      <CloudUploadIcon /> Subir Icono
                    </Button>
                  </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InputLabel style={{ color: '#AAAAAA' }}>
                    Vista Previa
                  </InputLabel>

                  <GridItem
                    style={{
                      background: serviceType.color,
                      color: serviceType.color,
                      border: '2px solid #000',
                    }}
                  >
                    <GridContainer alignItems='center' justify='center'>
                      <img
                        src={
                          serviceType.imgUrl
                            ? serviceType.imgUrl
                            : 'https://firebasestorage.googleapis.com/v0/b/ponto-5c572.appspot.com/o/icons%2Fgrimace-solid.png?alt=media&token=2ad1759f-26cb-463e-8475-df2966ce4fc4'
                        }
                        className='preview-image-form'
                        alt='preview'
                      />
                    </GridContainer>
                  </GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {!isUpdating ? (
                <GridItem xs={1} sm={1} md={1}>
                  <Button
                    disabled={!isReady}
                    color='primary'
                    onClick={() => submitServiceType()}
                  >
                    Confirmar
                  </Button>
                </GridItem>
              ) : (
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    disabled={!isReady}
                    color='primary'
                    onClick={() => submitEdit()}
                  >
                    Actualizar
                  </Button>
                  <Button
                    color='secondary'
                    onClick={() => {
                      setIsUpdating(false)
                      cleanForm()
                    }}
                  >
                    Cancelar
                  </Button>
                </GridItem>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Tipos de Servicio</h4>
              <p className={classes.cardCategoryWhite}>
                Todos los tipos de servicio registrados en la aplicacion.
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer justify='flex-end'>
                <GridItem xs={12} sm={12} md={5}></GridItem>
              </GridContainer>
              {list && (
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    <Input
                      placeholder='Buscar...'
                      value={search}
                      onChange={handleSearch()}
                      startAdornment={
                        <InputAdornment position='start'>
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />,

                    <GridContainer justify='center'>
                      <GridItem justify='center'>{'Imagen'}</GridItem>
                    </GridContainer>,
                    'Color',
                    'Vista Previa',
                    '',
                  ]}
                  tableData={list}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
