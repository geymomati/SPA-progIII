import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PresupuestosContext } from '../context/PresupuestosContext.jsx'
import InputField from '../components/InputField'

function PresupuestoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { presupuestos, agregarPresupuesto, editarPresupuesto } = useContext(PresupuestosContext)

  const [cliente, setCliente] = useState('')
  const [vehiculo, setVehiculo] = useState('')
  const [trabajo, setTrabajo] = useState('Cambio de aceite')
  const [precio, setPrecio] = useState('')

  useEffect(() => {
    if (id) {
      const presupuesto = presupuestos.find((p) => p.id === parseInt(id))
      if (presupuesto) {
        setCliente(presupuesto.cliente)
        setVehiculo(presupuesto.vehiculo)
        setTrabajo(presupuesto.trabajo)
        setPrecio(presupuesto.precio)
      }
    } else {
      setCliente('')
      setVehiculo('')
      setTrabajo('Cambio de aceite')
      setPrecio('')
    }
  }, [id, presupuestos])

  const trabajosOpciones = [
    'Cambio de aceite',
    'Frenos',
    'Alineación',
    'Revisión general',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!cliente.trim() || !vehiculo.trim() || !precio || precio <= 0) {
      alert('Por favor, complete todos los campos correctamente.')
      return
    }

    if (id) {
      const presupuestoActualizado = {
        id: parseInt(id),
        cliente,
        vehiculo,
        trabajo,
        precio,
      }
      editarPresupuesto(presupuestoActualizado)
      alert(`Presupuesto actualizado para ${cliente}`)
    } else {
      const nuevoPresupuesto = {
        id: Date.now(),
        cliente,
        vehiculo,
        trabajo,
        precio,
      }
      agregarPresupuesto(nuevoPresupuesto)
      alert(`Presupuesto creado para ${cliente}`)
    }
    navigate('/presupuestos')
  }

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '50px auto',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: '24px',
          color: '#222',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '1.8rem',
        }}
      >
        {id ? 'Editar presupuesto' : 'Crear nuevo presupuesto'}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="cliente"
          label="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ingrese nombre del cliente"
        />

        <InputField
          id="vehiculo"
          label="Vehículo"
          value={vehiculo}
          onChange={(e) => setVehiculo(e.target.value)}
          placeholder="Ingrese vehículo o modelo"
        />

        <div className="input-group">
          <label htmlFor="trabajo" className="input-label">
            Trabajo a realizar
          </label>
          <select
            id="trabajo"
            value={trabajo}
            onChange={(e) => setTrabajo(e.target.value)}
            className="input-field"
          >
            {trabajosOpciones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <InputField
          id="precio"
          label="Precio estimado"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ingrese precio en $"
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0,123,255,0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          {id ? 'Actualizar presupuesto' : 'Guardar presupuesto'}
        </button>
      </form>
    </div>
  )
}

export default PresupuestoForm
