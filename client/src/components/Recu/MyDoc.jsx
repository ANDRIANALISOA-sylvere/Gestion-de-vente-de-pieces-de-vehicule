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
    borderWidth: "0.3px",
    borderColor: "#000000",
    borderRightWidth: 0,
  },
  specifique: {
    borderRightWidth: "0.3px",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    paddingRight: "80px",
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
  const [localUser, setLocalUser] = useState("");
  const [total, setTotal] = useState(0);
  const [tvaTotale, setTvaTotale] = useState(0);
  const [soldePayer, setSoldePayer] = useState(0);

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

  const getprix_unitaire = (id, quantite) => {
    const piece = pieces.find((item) => item.ID_Piece === id);
    if (piece) {
      const prix_unitaire = piece.Prix_unitaire_ht;
      const montant_total = prix_unitaire * quantite;
      const taxe = piece.TVA;
      const tva = piece.Prix_unitaire_ht * (piece.TVA / 100);
      return { prix_unitaire, montant_total, tva, taxe };
    }
  };

  const geNom = (id) => {
    const piece = pieces.find((item) => item.ID_Piece === id);
    if (piece) {
      const Nom = piece.Nom;
      return Nom;
    }
  };

  useEffect(() => {
    getListclient();
    getdetailsdata();
  }, [selectedRow]);

  useEffect(() => {
    const utilisateur = localStorage.getItem("user");
    setLocalUser(JSON.parse(utilisateur));
  }, []);

  useEffect(() => {
    let totalGeneral = 0;
    let tvaTotaleCalculee = 0;
    detailsdata.forEach((item) => {
      const { montant_total, tva } = getprix_unitaire(
        item.id_produit,
        item.quantite
      );
      totalGeneral += montant_total;
      tvaTotaleCalculee += tva;
    });
    setTotal(totalGeneral);
    setTvaTotale(tvaTotaleCalculee);

    const soldeAPayer = totalGeneral + tvaTotaleCalculee;
    setSoldePayer(soldeAPayer);
  }, [detailsdata]);

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
                Tanambao, Fianarantsoa, Madagascar, 301
              </Text>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                Site web : https://www.carpartscentral.mg
              </Text>
              <Text style={[styles.smallText, { opacity: "0.5" }]}>
                Mail : carpartscentral@gmail.com
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
            <Text style={styles.smallText}>CAISSIER</Text>
            <View style={{ marginTop: "5px" }}>
              <Text style={styles.smallText}>
                {localUser.nom} {localUser.prenom}
              </Text>
              <Text style={styles.smallText}>{localUser.email}</Text>
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
            <View style={[styles.tableCell, { width: "130px" }]}>
              <Text style={[styles.smallText]}>PRODUITS</Text>
            </View>
          </View>
          <View>
            <View style={[styles.tableCell, { width: "130px" }]}>
              <Text style={[styles.smallText]}>TVA</Text>
            </View>
          </View>
          <View>
            <View style={[styles.tableCell, { width: "130px" }]}>
              <Text style={[styles.smallText]}>QUANTITE</Text>
            </View>
          </View>
          <View>
            <View
              style={[styles.tableCell, styles.specifique, { width: "130px" }]}
            >
              <Text style={[styles.smallText]}>PRIX UNITAIRE HT</Text>
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
                  { width: "130px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>{geNom(item.id_produit)}</Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.tableCell,
                  { width: "130px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>
                  {getprix_unitaire(item.id_produit, item.quantite).taxe} %
                </Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.tableCell,
                  { width: "130px", borderTopWidth: "0px" },
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
                  { width: "130px", borderTopWidth: "0px" },
                ]}
              >
                <Text style={[styles.smallText]}>
                  {
                    getprix_unitaire(item.id_produit, item.quantite)
                      .prix_unitaire
                  }{" "}
                  Ar
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View style={[styles.totalContainer]}>
          <Text style={styles.smallText}>TOTAL HT : {total} Ar</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.smallText}>TOTAL TTC : {soldePayer} Ar</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text
            style={[styles.smallText, { fontSize: "10px", fontWeight: "bold" }]}
          >
            MONTANT A PAYE : {soldePayer} Ar
          </Text>
        </View>
        <Text
          style={[
            styles.smallText,
            {
              textAlign: "center",
              marginTop: "30px",
              borderTopWidth: "0.1px",
              paddingTop: "10px",
            },
          ]}
        >
          CarParts Central vous remercie de votre confiance !!!
        </Text>
      </Page>
    </Document>
  );
};

export default MyDoc;
