import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-design-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {useAlarms} from '../state/AlarmsContext';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import AppButton from '../components/AppButton';
import M3Switch from '../components/M3Switch';
import Card from '../components/Card';
import GenericAvatar from '../components/GenericAvatar';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectorContacto'>;

type Contact = {
  id: string;
  letter: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  status: string;
  linked: boolean;
  selected: boolean;
};

const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    letter: 'M',
    avatarBg: colors.sageGreen,
    avatarText: '#FFFFFF',
    name: 'Mamá',
    status: 'Celular vinculado',
    linked: true,
    selected: true,
  },
  {
    id: '2',
    letter: 'P',
    avatarBg: colors.sageTint,
    avatarText: colors.sageGreen,
    name: 'Papá',
    status: 'Sin vincular',
    linked: false,
    selected: false,
  },
  {
    id: '3',
    letter: 'A',
    avatarBg: colors.warmPeach,
    avatarText: '#FFFFFF',
    name: 'Andrés cuidador',
    status: 'Celular vinculado',
    linked: true,
    selected: true,
  },
  {
    id: '4',
    letter: 'C',
    avatarBg: colors.border,
    avatarText: colors.textMuted,
    name: 'Camila',
    status: 'Sin vincular',
    linked: false,
    selected: false,
  },
];

export default function SelectorContactoScreen({navigation}: Props) {
  const {markShared} = useAlarms();
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [search, setSearch] = useState('');

  const toggleContact = (id: string) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? {...c, selected: !c.selected} : c)),
    );
  };

  return (
    <View style={styles.screen}>
      <AppBar title="Compartir con" onBack={navigation.goBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Text style={styles.description}>
          Selecciona a las personas de tu círculo de confianza que recibirán
          alertas si no confirmas esta alarma.
        </Text>

        <TextInput
          mode="outlined"
          label="Buscar contacto"
          placeholder="Escribe un nombre..."
          value={search}
          onChangeText={setSearch}
          left={<TextInput.Icon icon="magnify" />}
          outlineColor={colors.border}
          activeOutlineColor={colors.sageGreen}
          style={styles.searchInput}
        />

        <View style={styles.contactList}>
          {contacts.map(contact => (
            <Card key={contact.id} radius={16} style={styles.contactRow}>
              <GenericAvatar
                letter={contact.letter}
                backgroundColor={contact.avatarBg}
                textColor={contact.avatarText}
              />
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text
                  style={[
                    styles.contactStatus,
                    contact.linked && styles.contactStatusLinked,
                  ]}>
                  {contact.status}
                </Text>
              </View>
              <M3Switch
                value={contact.selected}
                onValueChange={() => toggleContact(contact.id)}
              />
            </Card>
          ))}
        </View>

        <View style={styles.pageDots}>
          <Icon name="circle" size={8} color={colors.sageGreen} />
          <Icon name="circle" size={8} color={colors.border} />
          <Icon name="circle" size={8} color={colors.border} />
        </View>

        <AppButton
          label="Generar enlace para compartir"
          variant="outline"
          color={colors.sageGreen}
          onPress={() => {
            markShared();
            navigation.navigate('InvitacionEnviada');
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
    gap: 20,
  },
  description: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  searchInput: {
    backgroundColor: colors.surface,
  },
  contactList: {
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  contactInfo: {
    flex: 1,
    gap: 2,
  },
  contactName: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  contactStatus: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  contactStatusLinked: {
    color: colors.sageGreen,
  },
  pageDots: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
  },
});
