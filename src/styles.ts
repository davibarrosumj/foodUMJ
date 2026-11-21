import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight ?? 24)
        : Platform.OS === 'ios'
          ? 44
          : 0,
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSpacer: {
    width: 72,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  actions: {
    gap: 10,
    marginBottom: 16,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  bannerImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212529',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  bodyText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  mutedText: {
    fontSize: 13,
    color: '#6c757d',
  },
  queryInfo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#6c757d',
  },
  statusText: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
    textAlign: 'center',
  },
});
