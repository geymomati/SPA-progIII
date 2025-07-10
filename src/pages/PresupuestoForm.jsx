import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PresupuestosContext } from '../context/PresupuestosContext.jsx'
import InputField from '../components/InputField'
import Modal from '../components/Modal'
import ButtonModern from '../components/ButtonModern'
import { IconCheck, IconEdit, IconArrowLeft } from '../components/Icons'

function PresupuestoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { presupuestos, agregarPresupuesto, editarPresupuesto } = useContext(PresupuestosContext)

  const [cliente, setCliente] = useState('')
  const [vehiculo, setVehiculo] = useState('')
  const [trabajo, setTrabajo] = useState('Cambio de aceite')
  const [precio, setPrecio] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

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
      setModalMessage('Por favor, complete todos los campos correctamente.')
      setShowModal(true)
      return
    }
    setModalMessage(id ? '¿Deseas actualizar este presupuesto?' : '¿Deseas guardar este presupuesto?')
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (id) {
      const presupuestoActualizado = {
        id: parseInt(id),
        cliente,
        vehiculo,
        trabajo,
        precio,
      }
      editarPresupuesto(presupuestoActualizado)
      setModalMessage(`Presupuesto actualizado para ${cliente}`)
      setTimeout(() => {
        setShowModal(false)
        navigate('/presupuestos')
      }, 1200)
    } else {
      const nuevoPresupuesto = {
        id: Date.now(),
        cliente,
        vehiculo,
        trabajo,
        precio,
      }
      agregarPresupuesto(nuevoPresupuesto)
      setModalMessage(`Presupuesto creado para ${cliente}`)
      setTimeout(() => {
        setShowModal(false)
        navigate('/presupuestos')
      }, 1200)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
          padding: '36px 28px',
          minWidth: '320px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#6366f1',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: 18
          }}
          aria-label="Volver"
        >
          <IconArrowLeft size={20} /> Volver
        </button>
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
          <ButtonModern
            type="submit"
            variant="primary"
            icon={id ? <IconEdit size={18} /> : <IconCheck size={18} />}
          >
            {id ? 'Actualizar presupuesto' : 'Guardar presupuesto'}
          </ButtonModern>
        </form>
        <Modal
          show={showModal}
          title={modalMessage.includes('creado') || modalMessage.includes('actualizado') ? '¡Éxito!' : 'Confirmar acción'}
          message={modalMessage}
          onConfirm={modalMessage.includes('creado') || modalMessage.includes('actualizado') ? () => setShowModal(false) : handleConfirm}
          onCancel={() => setShowModal(false)}
          confirmText={modalMessage.includes('creado') || modalMessage.includes('actualizado') ? 'Cerrar' : 'Sí, confirmar'}
          cancelText={modalMessage.includes('creado') || modalMessage.includes('actualizado') ? '' : 'Cancelar'}
          autoClose={modalMessage.includes('creado') || modalMessage.includes('actualizado')}
        />
      </div>
    </div>
  )
}

export default PresupuestoForm
