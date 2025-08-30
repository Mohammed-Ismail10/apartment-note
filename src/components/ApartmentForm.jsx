import { useState, useEffect } from 'react'

const ApartmentForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    area: '',
    floor: '',
    size: '',
    rooms: '',
    bathrooms: '',
    livingRooms: '',
    price: '',
    contact: '',
    isFinished: true,
    hasElevator: false,
    notes: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    // if (!formData.area || !formData.price || !formData.contact) {
    //   alert('يرجى ملء الحقول المطلوبة: المنطقة، السعر، ورقم التواصل')
    //   return
    // }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price) || 0,
      floor: parseInt(formData.floor) || 0,
      size: parseFloat(formData.size) || 0,
      rooms: parseInt(formData.rooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      livingRooms: parseInt(formData.livingRooms) || 0
    })

    // Reset form after both adding and editing
    setFormData({
      area: '',
      floor: '',
      size: '',
      rooms: '',
      bathrooms: '',
      livingRooms: '',
      price: '',
      contact: '',
      isFinished: true,
      hasElevator: false,
      notes: ''
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="apartment-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="area">المنطقة</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="مثال: المعادي، الزمالك"
            />
          </div>

          <div className="form-group">
            <label htmlFor="floor">الدور</label>
            <input
              type="number"
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="رقم الدور"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="size">المساحة (متر مربع)</label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="المساحة بالمتر المربع"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rooms">عدد الغرف</label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              placeholder="عدد غرف النوم"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bathrooms">دورات المياه</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="عدد دورات المياه"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="livingRooms">قطع الصالة</label>
            <input
              type="number"
              id="livingRooms"
              name="livingRooms"
              value={formData.livingRooms}
              onChange={handleChange}
              placeholder="عدد قطع الصالة"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">السعر (جنيه)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="السعر بالجنيه المصري"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">رقم التواصل</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="رقم الهاتف أو وسيلة التواصل"
            />
          </div>
        </div>

        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="isFinished"
              name="isFinished"
              checked={formData.isFinished}
              onChange={handleChange}
            />
            <label htmlFor="isFinished">مشطبة</label>
          </div>

          <div className="checkbox-item">
            <input
              type="checkbox"
              id="hasElevator"
              name="hasElevator"
              checked={formData.hasElevator}
              onChange={handleChange}
            />
            <label htmlFor="hasElevator">يوجد مصعد</label>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="notes">ملاحظات</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="أي ملاحظات إضافية عن الشقة"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'تحديث الشقة' : 'إضافة الشقة'}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              إلغاء
            </button>
          )}
        </div>
      </form>
    </>















  )
}

export default ApartmentForm
