export type userInterface = {
	_id: string;
	fullName: string;
	// gender: string;
	email: string;
	// username: string;
	country: string,
	password: string;
	plan: 'free' | 'standard' | 'premium';
	avatar?: string;
	
	status: boolean;

	role: string,
	location?: userLocationInterface;

	createdAt: string;
	updatedAt: string;
};

export type userLocationInterface = {
	ip: string;
	// lastUsedIps: string[];
	country: string;
	region: string;
	city: string;
	isp: string;
	lat: number;
	lon: number;
};


export interface IpApiResponse {
	status: string;
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	isp: string;
	org: string;
	as: string;
	query: string;
}
