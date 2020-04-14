import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
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
import { useState, useEffect } from 'react'
import { useAllServiceTypes } from '../../hooks/useServiceType.js'

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
  const [isReady, setIsReady] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const [serviceType, setServiceType] = useState({
    color: '#000',
    serviceType: '',
  })
  const [image, setImage] = useState('')
  const [list, setList] = useState([])
  const { serviceTypes } = useAllServiceTypes()

  const manageEdit = (id) => {
    console.log(id)
  }

  const colorOnChange = (props) => (e) => {
    let value = e.target.value
    switch (props) {
      case 'color':
        if (!value.match('#')) {
          value = '#' + value
        }
        if (value.length >= 1 && value.length < 8) {
          setServiceType({ ...serviceType, [props]: value })
        }
        break
      default:
        setServiceType({ ...serviceType, [props]: value })
        break
    }
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

  const imageOnChange = (e) => {
    let file = new FileReader()
    let url
    file.onload = function () {
      url = file.result
      setImage(url)
    }
    file.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    let newList = []

    newList = serviceTypes.map((value) => {
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
          onClick={() => manageEdit(value.id)}
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
                    value={image}
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
                <GridItem xs={12} sm={12} md={4}>
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
                    <img src={image} className='preview-image-form' />_
                  </GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridItem xs={1} sm={1} md={1}>
                <Button
                  disabled={!isReady}
                  color='primary'
                  // onClick={}
                >
                  Confirmar
                </Button>
              </GridItem>
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
              {list && (
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'Nombre',

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
