// ==== CLASSE PARA GERAÇÃO GENÉRICA DE CARDS/ITENS ==== //
import 'package:flutter/material.dart';
import 'package:primeiro_projeto/models/transfers_storage.dart';

// ignore: must_be_immutable
class TransferItem extends StatelessWidget with TransfersStorage{
  late double valor;
  late int conta;
  late String uuid;

  // ignore: use_key_in_widget_constructors
  TransferItem(this.valor, this.conta, this.uuid);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(3),
      child: Column(
        children: <Widget>[
          Card(
            // ==== Linha única do card ==== //
            child: Row(
              children: [
                // ==== Primeira coluna do card ==== //
                Expanded(
                  flex: 7,
                  child: ListTile(
                    leading: const Icon(Icons.monetization_on),
                    title: Text("R\$ ${valor.toString()}"),
                    subtitle: Text("Account: ${conta.toString()}"),
                    trailing: TextButton(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text("Transaction ID: $uuid"),
                          ));
                        },
                        child: const Text("ID", style: TextStyle(fontSize: 15))),
                  ),
                ),
                // ==== Segunda coluna do card ==== //
                Expanded(
                  flex: 1,
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    children: <Widget>[
                      IconButton(
                        onPressed: () {
                          // Quebrar o ID da transferência em uma lista de valores
                          List<dynamic> transferIDSplit = this.uuid.split("-");

                          // Extrair o valor da primeira posição da lista
                          // Esse primeiro valor é igual à posição do elemento na Lista de transferências
                          int transferStorageIndex = transferIDSplit[0];

                          // Remoção da transferência a partir do seu índice
                          //transfersList.removeAt(transferStorageIndex);
                        },
                        icon: const Icon(Icons.delete),
                        color: Colors.red,
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}


