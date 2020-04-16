import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import Table from '../../components/Table/Table.js'
import { useState, useEffect } from 'react'
import { useAllUsers } from '../../hooks/useUser.js'
import { InputAdornment, Input } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

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

export default function UserList(props) {
  const [list, setList] = useState([])
  const { users, isReload } = useAllUsers()
  const [search, setSearch] = useState('')

  const handleSearch = () => (e) => {
    let searchValue = e.target.value
    setSearch(searchValue)
    if (searchValue.length > 0 || searchValue !== '') {
      let newList = []
      list.forEach((value) => {
        if (value[1].includes(searchValue)) {
          newList.push(value)
        }
      })
      setList(newList)
    } else {
      isReload()
    }
  }
  useEffect(() => {
    let newList = []
    console.log(users)
    newList = users.map((value) => {
      return [
        value.userType === 1 ? 'Solicitante' : 'Oferente',
        value.fullName,
        value.birthDate,
        value.email,
        value.identificationNumber,
        <GridContainer justify='center'>
          <GridItem justify='center'>{value.rating}</GridItem>
        </GridContainer>,
      ]
    })
    setList(newList)
  }, [users])

  const classes = useStyles()
  return (
    <div>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Usuarios</h4>
              <p className={classes.cardCategoryWhite}>
                Todos los usuarios registrados en la aplicacion.
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer justify='flex-start'>
                <GridItem xs={12} sm={12} md={5}>
                  <Input
                    placeholder='Buscar...'
                    value={search}
                    onChange={handleSearch()}
                    fullWidth
                    startAdornment={
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </GridItem>
              </GridContainer>
              {list && (
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'Tipo de Usuario',
                    'Nombre',
                    'Fecha de Nacimiento',
                    'E-mail',
                    'Identificacion',

                    <GridContainer justify='center'>
                      <GridItem justify='center'>{'Calificacion'}</GridItem>
                    </GridContainer>,
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
