import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useFecth } from "../../hooks/Fetch/useFetch";
import axios from "axios";

const styles = StyleSheet.create({
  body: {
    color: "#e2e8f0",
  },
  container: {
    flexDirection: "column",
    padding: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  tableCell: {
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000000",
    borderRightWidth: 0,
  },
  specifique: {
    borderRightWidth: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  smallText: {
    fontSize: 8,
  },
  line: {
    lineHeight: 1.5,
  },
});

const MyDoc = ({ selectedRow }) => {
  const [detailsclient, setDetailsClient] = useState({});
  const [detailsdata, setDetailsData] = useState([]);

  const getListclient = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/client/" + selectedRow.ID_Client
      );
      setDetailsClient(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getdetailsdata = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/tablecommande/" + selectedRow.ID_Commande
      );
      setDetailsData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { donne: pieces } = useFecth("http://localhost:5000/piece");

  const getprix_unitaire = (id) => {
    const piece = pieces.find((item) => item.ID_Piece === id);
    if (piece) {
      return piece.Prix_unitaire_ht;
    }
  };

  useEffect(() => {
    getListclient();
    getdetailsdata();
  }, [selectedRow]);

  console.log(detailsdata);
  console.log(detailsclient);
  console.log(selectedRow);
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: "20px", marginBottom: "2px" }}>
              CarParts Central
            </Text>
            <View style={styles.line}>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                123 Adresse, Ville, État, Code postal/Poste
              </Text>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                Site web : https://www.josephinsylvere.mg
              </Text>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                Mail : josephinsylvere@gmail.com
              </Text>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                Tél : 0343947844
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.addressContainer,
            { paddingLeft: "30px", paddingRight: "30px" },
          ]}
        >
          <View>
            <Text style={styles.smallText}>FACTURER</Text>
            <View style={{ marginTop: "5px" }}>
              <Text style={styles.smallText}>
                ANDRIANALISOA Joséphin Sylvère
              </Text>
              <Text style={styles.smallText}>
                0343947844, josephinsylvere@gmail.com
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.smallText}>CLIENT</Text>
            <View style={{ marginTop: "5px" }}>
              <Text style={styles.smallText}>{detailsclient.Nom}</Text>
              <Text style={styles.smallText}>{detailsclient.adresse}</Text>
              <Text style={styles.smallText}>{detailsclient.Tel}</Text>
              <Text style={styles.smallText}>{detailsclient.email}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.smallText}>
              Numéro de commande: {selectedRow.ID_Commande}
            </Text>
            <Text style={styles.smallText}>
              Date de commande: {selectedRow.DateCommande}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.addressContainer,
            { marginTop: "10px", paddingLeft: "30px", paddingRight: "30px" },
          ]}
        >
          <View>
            <View style={[styles.tableCell, { width: "180px" }]}>
              <Text style={[styles.smallText]}>PRODUIT</Text>
            </View>
          </View>
          <View>
            <View style={[styles.tableCell, { width: "180px" }]}>
              <Text style={[styles.smallText]}>QTÉ</Text>
            </View>
          </View>
          <View>
            <View
              style={[styles.tableCell, styles.specifique, { width: "180px" }]}
            >
              <Text style={[styles.smallText]}>PRIX UNITAIRE</Text>
            </View>
          </View>
        </View>
        {detailsdata.map((item, index) => (
          <View
            key={index}
            style={[
              styles.addressContainer,
              { paddingLeft: "30px", paddingRight: "30px" },
            ]}
          >
            <View>
              <View
                style={[
                  styles.tableCell,
                  { width: "180px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>{item.id_produit}</Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.tableCell,
                  { width: "180px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>{item.quantite}</Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.tableCell,
                  styles.specifique,
                  { width: "180px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>
                  {getprix_unitaire(item.id_produit)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>TOTAL 0,00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>RABAIS 0,00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>SOUS-TOTAL MOINS LA REMISE 0,00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>TAUX D'IMPOSITION 0,00 %</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>TAXE TOTAL 0,00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>EXPÉDITION/MANUTENTION 0,00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>Solde payé $ -</Text>
        </View>
        <Text style={styles.smallText}>Merci pour votre entreprise!</Text>
      </Page>
    </Document>
  );
};

export default MyDoc;
