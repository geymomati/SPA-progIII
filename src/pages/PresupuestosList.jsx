import React, { useContext, useState } from 'react'
import { PresupuestosContext } from '../context/PresupuestosContext.jsx'
import { useNavigate } from 'react-router-dom'
import PresupuestoItem from '../components/PresupuestoItem.jsx'

function PresupuestosList() {
  const { presupuestos, eliminarPresupuesto } = useContext(PresupuestosContext)
  const navigate = useNavigate()

  const [paginaActual, setPaginaActual] = useState(1)
  const presupuestosPorPagina = 5

  const totalPaginas = Math.ceil(presupuestos.length / presupuestosPorPagina)

  const indexInicio = (paginaActual - 1) * presupuestosPorPagina
  const indexFin = indexInicio + presupuestosPorPagina
  const presupuestosPagina = presupuestos.slice(indexInicio, indexFin)

  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1)
    }
  }

  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
        padding: '36px 28px',
        minWidth: '320px',
        maxWidth: '900px',
        width: '100%',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
          Lista de presupuestos
        </h2>

        {/* Botones de navegación */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/perfil')}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              backgroundColor: '#28a745',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Ir al Perfil
          </button>

          <button
            onClick={() => navigate('/presupuestos/nuevo')}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Nuevo Presupuesto
          </button>
        </div>

        {presupuestos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay presupuestos cargados.</p>
        ) : (
          <>
            {presupuestosPagina.map((presupuesto) => (
              <PresupuestoItem
                key={presupuesto.id}
                presupuesto={presupuesto}
                onEditar={() => navigate(`/presupuestos/editar/${presupuesto.id}`)}
                onEliminar={() => eliminarPresupuesto(presupuesto.id)}
              />
            ))}

            {/* Controles de paginación */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '12px' }}>
              <button
                onClick={irAPaginaAnterior}
                disabled={paginaActual === 1}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: paginaActual === 1 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Anterior
              </button>

              <span style={{ alignSelf: 'center', fontWeight: '600' }}>
                Página {paginaActual} de {totalPaginas}
              </span>

              <button
                onClick={irAPaginaSiguiente}
                disabled={paginaActual === totalPaginas}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: paginaActual === totalPaginas ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
                }}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PresupuestosList
