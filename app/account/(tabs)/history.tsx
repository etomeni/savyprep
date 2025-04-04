import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import AppSafeAreaView from '@/components/custom/AppSafeAreaView';
import AppScrollView from '@/components/custom/AppScrollView';
import AppText from '@/components/custom/AppText';
import { kolors } from '@/constants/Colors';
import EmptyState from '@/components/history/EmptyState';
import PreparationCard from '@/components/history/PreparationCard';


const HistoryDashboard = () => {
	const tabs = ['All Sessions', 'Exam Prep', 'Interview Prep'];
	const sortOptions = ['Newest First', 'Oldest First'];
	const [activeTab, setActiveTab] = useState('All Sessions');
	const [sortOrder, setSortOrder] = useState('Newest First');
	const [searchQuery, setSearchQuery] = useState('');


	return (
		<AppSafeAreaView>
			<AppScrollView>
				<View style={styles.container}>

					<View style={styles.headerContainer}>
						<AppText style={styles.headerText}
						>History</AppText>

						<AppText style={styles.subheader}
						>View and manage your preparation sessions.</AppText>
					</View>

					<View style={styles.sortContainer}>
						{sortOptions.map((option) => (
							<TouchableOpacity
								key={option}
								onPress={() => setSortOrder(option)}
								style={[
									styles.sortOption,
									sortOrder === option && styles.activeSortOption
								]}
							>
								<AppText style={[
									styles.sortOptionText,
									sortOrder === option && styles.activeSortOptionText
								]}>
									{option}
								</AppText>
							</TouchableOpacity>
						))}
					</View>

					<TextInput
						style={styles.searchInput}
						placeholder="Search sessions..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						
					/>

					{/* <View style={{ position: "relative" }}> */}
						<View style={styles.tabContainer}>
							{tabs.map((tab, index) => (
								<TouchableOpacity
									key={index}
									onPress={() => setActiveTab(tab)}
									style={[
										styles.tab,
										activeTab === tab && styles.activeTab
									]}
								>
									<AppText style={[
										styles.tabText,
										activeTab === tab && styles.activeTabText
									]}> { tab } </AppText>
								</TouchableOpacity>
							))}
						</View>

						<View style={styles.divider} />
					{/* </View> */}

					{/* <EmptyState activeTab={activeTab} /> */}

					<PreparationCard />
				</View>
			</AppScrollView>
		</AppSafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",

		width: "100%",
		maxWidth: 600,
		// padding: 15,
		marginHorizontal: "auto",
		marginVertical: "auto",
	},
	headerContainer: {
		flexDirection: "column",
		gap: 10,
		marginTop: 15,
		marginBottom: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	subheader: {
		fontSize: 16,
		color: '#666',
		marginBottom: 20,
	},
	sortContainer: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	sortOption: {
		marginRight: 16,
		paddingVertical: 4,
	},
	activeSortOption: {
		borderBottomWidth: 2,
		borderBottomColor: kolors.theme.primary, // '#007AFF',
	},
	sortOptionText: {
		fontSize: 14,
		color: '#666',
	},
	activeSortOptionText: {
		color: kolors.theme.primary, // '#007AFF',
		fontWeight: 'bold',
	},

	searchInput: {
		height: 40,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 16,
		backgroundColor: '#f8f8f8',
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	tab: {
		paddingBottom: 8,
	},
	activeTab: {
		borderBottomWidth: 2,
		borderBottomColor: kolors.theme.secondry, // '#007AFF',
	},
	tabText: {
		fontSize: 16,
		color: '#666',
	},
	activeTabText: {
		color: kolors.theme.secondry, // '#007AFF',
		fontWeight: 'bold',
	},
	divider: {
		height: 1,
		backgroundColor: '#eee',
		// backgroundColor: 'red',
		marginBottom: 24,
		// position: "absolute",
		top: -18,
	},
});

export default HistoryDashboard;