import { useQuery } from "@apollo/client/react";
import { GET_EQUIPMENTS_IN_USE } from '../../../database/graphql/queries/Equipments';

export function EquipmentsInUse() {
  const { data, loading, error } = useQuery(GET_EQUIPMENTS_IN_USE);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar equipamentos.</p>;

  return (
    <div>
      <h2>Equipamentos em uso:</h2>
      <ul>
        {data.allEquipment.map((item) => (
          <li key={item.id}>🟢 {item.name} ({item.type})</li>
        ))}
      </ul>
    </div>
  );
}