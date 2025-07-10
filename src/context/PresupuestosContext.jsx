import { createContext, useState, useEffect } from 'react'

export const PresupuestosContext = createContext()

export function PresupuestosProvider({ children }) {
  const [presupuestos, setPresupuestos] = useState(() => {
    const saved = localStorage.getItem('presupuestos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos))
  }, [presupuestos])

  const agregarPresupuesto = (nuevoPresupuesto) => {
    setPresupuestos([...presupuestos, nuevoPresupuesto])
  }

  const editarPresupuesto = (presupuestoActualizado) => {
    setPresupuestos(
      presupuestos.map((p) =>
        p.id === presupuestoActualizado.id ? presupuestoActualizado : p
      )
    )
  }

  const eliminarPresupuesto = (id) => {
    setPresupuestos(presupuestos.filter((p) => p.id !== id))
  }

  return (
    <PresupuestosContext.Provider
      value={{
        presupuestos,
        agregarPresupuesto,
        editarPresupuesto,
        eliminarPresupuesto,
      }}
    >
      {children}
    </PresupuestosContext.Provider>
  )
}
