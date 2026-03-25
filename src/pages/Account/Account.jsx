import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const BASE = 'https://ecommerce.routemisr.com/api/v1'
const AVATAR = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face'

export default function Account() {
    const { user, token, updateUser } = useAuth()
    const [activeTab, setActiveTab] = useState('info')

    // ── Edit Profile States ──
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        name: '', email: '', phone: ''
    })
    const [updateLoading, setUpdateLoading] = useState(false)
    const [updateError, setUpdateError] = useState('')
    const [updateSuccess, setUpdateSuccess] = useState(false)

    // ── Change Password States ──
    const [pwData, setPwData] = useState({
        currentPassword: '', password: '', rePassword: ''
    })
    const [pwLoading, setPwLoading] = useState(false)
    const [pwError, setPwError] = useState('')
    const [pwSuccess, setPwSuccess] = useState(false)
    const [showPw, setShowPw] = useState({
        current: false, new: false, confirm: false
    })

    // Fill form with current user data when entering edit mode
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            })
        }
    }, [user, editMode])

    // ── Update Profile ──
    async function handleUpdate(e) {
        e.preventDefault()
        setUpdateLoading(true)
        setUpdateError('')
        setUpdateSuccess(false)

        const tokenValue = localStorage.getItem('token')

        // Build body — skip phone if empty (API requires Egyptian format)
        const bodyData = {
            name: formData.name,
            email: formData.email,
        }
        if (formData.phone) {
            bodyData.phone = formData.phone
        }

        try {
            const { data } = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/users/updateMe',
                bodyData,
                { headers: { token: tokenValue } }
            )
            updateUser(data.user)
            setUpdateSuccess(true)
            setEditMode(false)
        } catch (err) {
            const apiError = err.response?.data?.errors

            if (apiError?.param === 'email') {
                setUpdateError('This email is already in use by another account.')
            } else if (apiError?.param === 'phone') {
                setUpdateError('Invalid phone number format. Use: 01XXXXXXXXX')
            } else if (apiError?.param === 'name') {
                setUpdateError('Name must be at least 3 characters.')
            } else {
                setUpdateError(err.response?.data?.message || 'Something went wrong')
            }
        } finally {
            setUpdateLoading(false)
        }
    }

    // ── Change Password ──
    // IMPORTANT: This API returns a NEW token — must save it
    async function handlePasswordChange(e) {
        e.preventDefault()
        if (pwData.password !== pwData.rePassword) {
            setPwError('New passwords do not match')
            return
        }
        setPwLoading(true)
        setPwError('')
        setPwSuccess(false)
        try {
            const { data } = await axios.put(
                `${BASE}/users/changeMyPassword`,
                pwData,
                { headers: { token } }
            )
            // API returns new token — save it
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            setPwSuccess(true)
            setPwData({ currentPassword: '', password: '', rePassword: '' })
        } catch (err) {
            setPwError(
                err.response?.data?.message || 'Current password is incorrect'
            )
        } finally {
            setPwLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* ══ TOP PROFILE CARD ══ */}
                <div className="bg-white rounded-2xl shadow-sm border 
          border-gray-100 p-6 mb-6 flex items-center gap-5">
                    <img
                        src={AVATAR}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover 
              ring-4 ring-primary-100 flex-shrink-0"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {user?.name || '—'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {user?.email || '—'}
                        </p>
                        <span className="inline-block mt-2 px-3 py-0.5 
              bg-primary-50 text-primary-600 text-xs 
              font-semibold rounded-full capitalize">
                            {user?.role || 'Customer'}
                        </span>
                    </div>
                </div>

                {/* ══ TABS ══ */}
                <div className="bg-white rounded-2xl shadow-sm 
          border border-gray-100 overflow-hidden">

                    <div className="flex border-b border-gray-100">
                        {[
                            { key: 'info', label: 'My Information', icon: 'fa-user' },
                            { key: 'password', label: 'Change Password', icon: 'fa-lock' },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    setActiveTab(tab.key)
                                    setEditMode(false)
                                    setUpdateSuccess(false)
                                    setPwSuccess(false)
                                    setPwError('')
                                    setUpdateError('')
                                }}
                                className={`flex items-center gap-2 px-6 py-4 text-sm 
                  font-medium border-b-2 transition-colors duration-200
                  ${activeTab === tab.key
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <i className={`fa-solid ${tab.icon}`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">

                        {/* ══ TAB 1: My Information ══ */}
                        {activeTab === 'info' && (
                            <div>
                                {updateSuccess && !editMode && (
                                    <div className="flex items-center gap-3 p-4 
                    bg-green-50 rounded-xl border border-green-200 mb-5">
                                        <i className="fa-solid fa-circle-check text-green-500"></i>
                                        <p className="text-sm font-medium text-green-700">
                                            Profile updated successfully!
                                        </p>
                                    </div>
                                )}

                                {/* VIEW MODE */}
                                {!editMode && (
                                    <div>
                                        <div className="space-y-px mb-6">

                                            {/* Name Row */}
                                            <div className="flex items-center justify-between 
                        p-4 rounded-xl bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-white 
                            border border-gray-200 flex items-center 
                            justify-center">
                                                        <i className="fa-solid fa-user 
                              text-primary-600 text-xs"></i>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Full Name</p>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">
                                                            {user?.name || '—'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email Row */}
                                            <div className="flex items-center justify-between 
                        p-4 rounded-xl bg-gray-50 mt-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-white 
                            border border-gray-200 flex items-center 
                            justify-center">
                                                        <i className="fa-solid fa-envelope 
                              text-primary-600 text-xs"></i>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Email Address</p>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">
                                                            {user?.email || '—'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="flex items-center gap-2 px-5 py-2.5 
                        bg-primary-600 text-white rounded-xl text-sm 
                        font-medium hover:bg-primary-700 transition-colors">
                                            <i className="fa-solid fa-pen text-xs"></i>
                                            Edit Information
                                        </button>
                                    </div>
                                )}

                                {/* EDIT MODE */}
                                {editMode && (
                                    <form onSubmit={handleUpdate} className="space-y-4">
                                        {updateError && (
                                            <div className="p-4 bg-red-50 rounded-xl 
                        border border-red-200 text-sm text-red-600">
                                                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                                                {updateError}
                                            </div>
                                        )}

                                        {/* Name Input */}
                                        <div>
                                            <label className="block text-sm font-medium 
                        text-gray-700 mb-1.5">Full Name</label>
                                            <div className="relative">
                                                <i className="fa-solid fa-user absolute left-3 
                          top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({
                                                        ...formData, name: e.target.value
                                                    })}
                                                    placeholder="Your full name"
                                                    className="w-full pl-9 pr-4 py-2.5 border 
                            border-gray-200 rounded-xl text-sm 
                            focus:outline-none focus:ring-2 
                            focus:ring-primary-100 
                            focus:border-primary-600 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div>
                                            <label className="block text-sm font-medium 
                        text-gray-700 mb-1.5">Email Address</label>
                                            <div className="relative">
                                                <i className="fa-solid fa-envelope absolute left-3 
                          top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({
                                                        ...formData, email: e.target.value
                                                    })}
                                                    placeholder="your@email.com"
                                                    className="w-full pl-9 pr-4 py-2.5 border 
                            border-gray-200 rounded-xl text-sm 
                            focus:outline-none focus:ring-2 
                            focus:ring-primary-100 
                            focus:border-primary-600 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={updateLoading}
                                                className="flex items-center gap-2 px-5 py-2.5 
                          bg-primary-600 text-white rounded-xl text-sm 
                          font-medium hover:bg-primary-700 transition-colors
                          disabled:opacity-50 disabled:cursor-not-allowed">
                                                <i className={`fa-solid text-xs ${updateLoading
                                                    ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
                                                {updateLoading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditMode(false)
                                                    setUpdateError('')
                                                }}
                                                className="flex items-center gap-2 px-5 py-2.5 
                          border border-gray-200 text-gray-600 rounded-xl 
                          text-sm font-medium hover:bg-gray-50 
                          transition-colors">
                                                <i className="fa-solid fa-xmark text-xs"></i>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* ══ TAB 2: Change Password ══ */}
                        {activeTab === 'password' && (
                            <form onSubmit={handlePasswordChange} className="space-y-4">

                                <div className="flex items-start gap-3 p-4 bg-blue-50 
                  rounded-xl border border-blue-100 mb-2">
                                    <i className="fa-solid fa-shield-halved 
                    text-blue-500 mt-0.5 text-sm"></i>
                                    <p className="text-sm text-blue-700">
                                        After changing your password you will receive
                                        a new token automatically.
                                    </p>
                                </div>

                                {pwError && (
                                    <div className="p-4 bg-red-50 rounded-xl 
                    border border-red-200 text-sm text-red-600">
                                        <i className="fa-solid fa-circle-exclamation mr-2"></i>
                                        {pwError}
                                    </div>
                                )}

                                {pwSuccess && (
                                    <div className="flex items-center gap-3 p-4 
                    bg-green-50 rounded-xl border border-green-200">
                                        <i className="fa-solid fa-circle-check text-green-500"></i>
                                        <div>
                                            <p className="text-sm font-medium text-green-700">
                                                Password changed successfully!
                                            </p>
                                            <p className="text-xs text-green-600 mt-0.5">
                                                New token saved automatically.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Password Fields */}
                                {[
                                    { label: 'Current Password', key: 'currentPassword', show: 'current', icon: 'fa-lock' },
                                    { label: 'New Password', key: 'password', show: 'new', icon: 'fa-key' },
                                    { label: 'Confirm Password', key: 'rePassword', show: 'confirm', icon: 'fa-key' },
                                ].map(({ label, key, show, icon }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium 
                      text-gray-700 mb-1.5">{label}</label>
                                        <div className="relative">
                                            <i className={`fa-solid ${icon} absolute left-3 
                        top-1/2 -translate-y-1/2 text-gray-400 text-sm`}></i>
                                            <input
                                                type={showPw[show] ? 'text' : 'password'}
                                                value={pwData[key]}
                                                onChange={e => setPwData({ ...pwData, [key]: e.target.value })}
                                                placeholder={`Enter ${label.toLowerCase()}`}
                                                className="w-full pl-9 pr-10 py-2.5 border 
                          border-gray-200 rounded-xl text-sm 
                          focus:outline-none focus:ring-2 
                          focus:ring-primary-100 
                          focus:border-primary-600 transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPw({
                                                    ...showPw, [show]: !showPw[show]
                                                })}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 
                          text-gray-400 hover:text-gray-600">
                                                <i className={`fa-solid text-sm ${showPw[show]
                                                    ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={pwLoading}
                                    className="flex items-center gap-2 px-5 py-2.5 
                    bg-primary-600 text-white rounded-xl text-sm 
                    font-medium hover:bg-primary-700 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed">
                                    <i className={`fa-solid text-xs ${pwLoading
                                        ? 'fa-spinner fa-spin' : 'fa-shield-halved'}`}></i>
                                    {pwLoading ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}