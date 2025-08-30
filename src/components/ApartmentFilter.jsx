import { useState } from 'react'

const ApartmentFilter = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    area: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    bathrooms: '',
    hasElevator: '',
    isFinished: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFilters = {
      ...filters,
      [name]: value
    }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      area: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      bathrooms: '',
      hasElevator: '',
      isFinished: ''
    }
    setFilters(resetFilters)
    onReset()
  }

  return (
    <div className="apartment-filter">
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="filter-area">المنطقة</label>
          <input
            type="text"
            id="filter-area"
            name="area"
            value={filters.area}
            onChange={handleChange}
            placeholder="ابحث بالمنطقة"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-minPrice">أقل سعر</label>
          <input
            type="number"
            id="filter-minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="من"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-maxPrice">أعلى سعر</label>
          <input
            type="number"
            id="filter-maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="إلى"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-rooms">عدد الغرف (الأدنى)</label>
          <select
            id="filter-rooms"
            name="rooms"
            value={filters.rooms}
            onChange={handleChange}
          >
            <option value="">كل الغرف</option>
            <option value="1">1+ غرفة</option>
            <option value="2">2+ غرفة</option>
            <option value="3">3+ غرف</option>
            <option value="4">4+ غرف</option>
            <option value="5">5+ غرف</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-bathrooms">دورات المياه (الأدنى)</label>
          <select
            id="filter-bathrooms"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
          >
            <option value="">كل دورات المياه</option>
            <option value="1">1+ دورة مياه</option>
            <option value="2">2+ دورة مياه</option>
            <option value="3">3+ دورات مياه</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-elevator">المصعد</label>
          <select
            id="filter-elevator"
            name="hasElevator"
            value={filters.hasElevator}
            onChange={handleChange}
          >
            <option value="">الكل</option>
            <option value="true">يوجد مصعد</option>
            <option value="false">لا يوجد مصعد</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-finished">التشطيب</label>
          <select
            id="filter-finished"
            name="isFinished"
            value={filters.isFinished}
            onChange={handleChange}
          >
            <option value="">الكل</option>
            <option value="true">مشطبة</option>
            <option value="false">غير مشطبة</option>
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={handleReset} className="btn btn-secondary">
          إعادة تعيين الفلاتر
        </button>
      </div>
    </div>
  )
}

export default ApartmentFilter
