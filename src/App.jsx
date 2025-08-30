import { useState, useEffect } from 'react'
import './App.css'
import ApartmentForm from './components/ApartmentForm'
import ApartmentList from './components/ApartmentList'
import ApartmentFilter from './components/ApartmentFilter'

function App() {
  const [apartments, setApartments] = useState([])
  const [filteredApartments, setFilteredApartments] = useState([])
  const [editingApartment, setEditingApartment] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load apartments from localStorage on component mount
  useEffect(() => {
    const savedApartments = localStorage.getItem('apartments')
    if (savedApartments) {
      try {
        const parsedApartments = JSON.parse(savedApartments)
        setApartments(parsedApartments)
        setFilteredApartments(parsedApartments)
      } catch (error) {
        console.error('Error parsing saved apartments:', error)
        localStorage.removeItem('apartments')
      }
    }
    setIsLoaded(true)
  }, [])

  // Save apartments to localStorage whenever apartments change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('apartments', JSON.stringify(apartments))
      setFilteredApartments(apartments)
    }
  }, [apartments, isLoaded])

  const addApartment = (apartmentData) => {
    const newApartment = {
      id: Date.now(),
      ...apartmentData,
      createdAt: new Date().toISOString()
    }
    setApartments([...apartments, newApartment])
  }

  const updateApartment = (id, updatedData) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, ...updatedData } : apt
    ))
    setEditingApartment(null)
  }

  const deleteApartment = (id) => {
    setApartments(apartments.filter(apt => apt.id !== id))
  }

  const handleFilter = (filters) => {
    let filtered = apartments

    if (filters.area) {
      filtered = filtered.filter(apt => 
        apt.area.toLowerCase().includes(filters.area.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(apt => apt.price >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(apt => apt.price <= filters.maxPrice)
    }

    if (filters.rooms) {
      filtered = filtered.filter(apt => apt.rooms >= filters.rooms)
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(apt => apt.bathrooms >= filters.bathrooms)
    }

    if (filters.hasElevator !== '') {
      const hasElevator = filters.hasElevator === 'true'
      filtered = filtered.filter(apt => apt.hasElevator === hasElevator)
    }

    if (filters.isFinished !== '') {
      const isFinished = filters.isFinished === 'true'
      filtered = filtered.filter(apt => apt.isFinished === isFinished)
    }

    setFilteredApartments(filtered)
  }

  const resetFilters = () => {
    setFilteredApartments(apartments)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>سجل الشقق</h1>
        <p>سجل وتتبع الشقق التي بحثت عنها</p>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="form-section">
            <h2>{editingApartment ? 'تعديل الشقة' : 'إضافة شقة جديدة'}</h2>
            <ApartmentForm 
              onSubmit={editingApartment ? 
                (data) => updateApartment(editingApartment.id, data) : 
                addApartment
              }
              initialData={editingApartment}
              onCancel={() => setEditingApartment(null)}
            />
          </div>

          <div className="list-section">
            <h2>الشقق المسجلة ({filteredApartments.length})</h2>
            <ApartmentList 
              apartments={filteredApartments}
              onEdit={setEditingApartment}
              onDelete={deleteApartment}
            />
          </div>
        </div>

        <div className="sidebar">
          <div className="filter-section">
            <h2>تصفية الشقق</h2>
            <ApartmentFilter 
              onFilter={handleFilter}
              onReset={resetFilters}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
