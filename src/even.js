exports.getLoans = (monthlyIncome, creditScore) => {
	return fetch('https://api.evenfinancial.com/leads/rateTables', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization:
				'Bearer e7675dd3-ff3b-434b-95aa-70251cc3784b_88140dd4-f13e-4ce3-8322-6eaf2ee9a2d2'
		},
		body: JSON.stringify({
			productTypes: ['loan'],
			personalInformation: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				zipcode: '98006',
				ipAddress: '8.8.8.8',
				dateOfBirth: '1993-10-09',
				educationLevel: 'bachelors'
			},
			loanInformation: {},
			creditInformation: {
				providedNumericCreditScore: creditScore
			},
			financialInformation: {
				employmentStatus: 'employed',
				monthlyNetIncome: monthlyIncome
			},
			legalInformation: {
				consentsToFcra: true,
				consentsToTcpa: true,
				tcpaLanguage:
					'I agree to be contacted by Even Financial and its partners at the telephone number(s) I have provided above to explore personal loan offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand my consent is not required as a condition to purchasing any goods or services from anyone.'
			}
		}),
		credentials: 'include'
	})
}
