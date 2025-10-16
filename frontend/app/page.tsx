// On va reccupérer la liste des transactions de l'api avec type 
"use client"
import { use, useEffect, useState } from "react";
import api from "./api";
import { toast } from "react-hot-toast";
import { ArrowDownCircle, ArrowUpCircle, Wallet, Activity, TrendingUp, TrendingDown, Trash } from "lucide-react";

// on va définir le type Transaction
type Transaction = {
  id : string;
  text : string;
  amount : number;
  created_at : string
}

export default function Home() {
// on va créer une fonction qui permettra de reccupérer les transactions mettre à jour la liste des transactions
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // on va charger toutes les transactions
  const getTransactions = async () => {
    // on appelle la clause try et catch pour gérer les erreurs quand il y en a et nous le retourner
    try {
      const res = await api.get<Transaction[]>("transactions/")
      setTransactions(res.data)
      toast.success("Transactions chargées")
    } catch (error) {
      console.error("Erreur chargements transactions", error);
      toast.error("Erreur chargements transactions")
    }
  }

  // on va charger toutes les transactions
  const deleteTransaction = async (id: string) => {
    // on appelle la clause try et catch pour gérer les erreurs quand il y en a et nous le retourner
    try {
      await api.delete(`transactions/${id}/`)
      toast.success("Transaction supprimée")
    } catch (error) {
      console.error("Erreur suppression transaction", error);
      toast.error("Erreur suppression transaction")
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const amounts = transactions.map((t) =>Number(t.amount) || 0)
  const balance = amounts.reduce((acc ,item) => acc + item , 0) || 0
  const income = amounts.filter((a) => a > 0).reduce((acc, item) => acc + item , 0) || 0
  const expense = amounts.filter((a) => a < 0).reduce((acc, item) => acc + item , 0) || 0

  const ratio = income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
          <div className="flex flex-col gap-1">          
            <div className="badge badge-soft">
                <Wallet className="w-4 h4"/>
                Votre solde
              </div>
              
              <div className="stat-value">
                {balance.toFixed(2)} FCFA
              </div>
            </div>
            <div className="flex flex-col gap-1">          
            <div className="badge badge-soft badge-success">
                <ArrowUpCircle className="w-4 h4"/>
                Revenus
              </div>
              
              <div className="stat-value">
                {income.toFixed(2)} FCFA
              </div>
            </div> 
            <div className="flex flex-col gap-1">          
            <div className="badge badge-soft badge-error">
                <ArrowDownCircle className="w-4 h4"/>
                Dépenses
              </div>
              
              <div className="stat-value">
                {expense.toFixed(2)} FCFA
              </div>
            </div>  
        </div>
        <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
          <div className="flex justify-between item-center mb-1">           
              <div className="badge badge-soft badge-warning gap-1">
                <Activity className="w-4 h-4" />
                Dépenses vs Revenus
              </div>
              <div>{ratio.toFixed(0)}%</div>
            
          </div>

          <progress 
          className="progress progress-warning w-full"
          value={ratio} 
          max="100"
          >
          </progress>

        </div>

        {/* <button></button> */}
        <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Montant</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((t, index) => (      
        <tr
          key={t.id}>
          <th>{index +1}</th>
          <td>{t.text}</td>
          <td className="font semibold flex items-center gap-2">
            {t.amount > 0 ? (
              <TrendingUp className="text-success w-6 h-6" />
            ) : (
              <TrendingDown className="text-success w-6 h-6"/>
            )}
            {t.amount > 0 ? `+${t.amount}` : t.amount} FCFA
        </td>
          <td>
            {formatDate(t.created_at)}
          </td>
          <td>
            <button
            onClick={() => deleteTransaction(t.id)}
            className="btn btn-sm btn-error btn-soft" 
            title="Supprimer">
              <Trash className="w-4 h-4"/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
