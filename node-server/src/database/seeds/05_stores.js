/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Xóa tất cả dữ liệu cũ
	await knex('stores').del();

	// Thêm dữ liệu mẫu
	await knex('stores').insert([
		{
			id: 1,
			name: 'Store Vincom Hà Nội',
			slug: 'store-vincom-ha-noi',
			address: 'Tầng 1, Vincom Center, 191 Bà Triệu, Hà Nội',
			city: 'Hà Nội',
			country: 'Vietnam',
			latitude: 21.0135,
			longitude: 105.8542,
			phone: '024-12345678',
			email: 'hanoi@fashionstore.com',
			opening_hours: JSON.stringify({
				monday: '09:00-21:00',
				tuesday: '09:00-21:00',
				wednesday: '09:00-21:00',
				thursday: '09:00-21:00',
				friday: '09:00-21:00',
				saturday: '10:00-22:00',
				sunday: '10:00-22:00'
		}),
			thumbnail: '/images/stores/hanoi.jpg',
			status: 1
		},
		{
			id: 2,
			name: 'Store Vincom Hồ Chí Minh',
			slug: 'store-vincom-ho-chi-minh',
			address: 'Tầng 2, Vincom Center, 72 Lê Thánh Tôn, Quận 1, TP.HCM',
			city: 'Hồ Chí Minh',
			country: 'Vietnam',
			latitude: 10.7769,
			longitude: 106.7009,
			phone: '028-87654321',
			email: 'hcm@fashionstore.com',
			opening_hours: JSON.stringify({
				monday: '09:00-21:00',
				tuesday: '09:00-21:00',
				wednesday: '09:00-21:00',
				thursday: '09:00-21:00',
				friday: '09:00-21:00',
				saturday: '10:00-22:00',
				sunday: '10:00-22:00'
		}),
			thumbnail: '/images/stores/hcm.jpg',
			status: 1
		},
		{
			id: 3,
			name: 'Store Vincom Đà Nẵng',
			slug: 'store-vincom-da-nang',
			address: 'Tầng 1, Vincom Plaza, 910 Ngô Quyền, Đà Nẵng',
			city: 'Đà Nẵng',
			country: 'Vietnam',
			latitude: 16.0678,
			longitude: 108.2208,
			phone: '0236-11223344',
			email: 'danang@fashionstore.com',
			opening_hours: JSON.stringify({
				monday: '09:00-21:00',
				tuesday: '09:00-21:00',
				wednesday: '09:00-21:00',
				thursday: '09:00-21:00',
				friday: '09:00-21:00',
				saturday: '10:00-22:00',
				sunday: '10:00-22:00'
		}),
			thumbnail: '/images/stores/danang.jpg',
			status: 1
		}
	])
}