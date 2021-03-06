import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { useAlert } from '../../hooks/useAlert.js'
import Table from '../../components/Table/Table.js'
import { useState } from 'react'
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
  const [isReady, setIsReady] = useState(false)
  const { show, hide } = useAlert()
  const [isImage, setIsImage] = useState(false)
  const [serviceType, setServiceType] = useState({
    color: '#FFF',
    name: '',
  })
  const { serviceTypes } = useAllServiceTypes()
  console.log(serviceTypes)

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
      serviceType.name.length > 2 &&
      isImage
    ) {
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }

  const setNofication = () => {
    show(true, 'test')
  }
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
                    id='first-name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: serviceType.name,
                      onChange: colorOnChange('name'),
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
                    }}
                  >
                    o
                  </GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridItem xs={1} sm={1} md={1}>
                <Button
                  disabled={!isReady}
                  color='primary'
                  onClick={() => setNofication()}
                >
                  Ingresar
                </Button>
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              {serviceTypes && (
                <Table
                  tableHeaderColor='primary'
                  tableHead={['Nombre', 'Color']}
                  tableData={[
                    serviceTypes.map((value) => {
                      return [value.serviceType, value.color]
                    }),
                  ]}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
