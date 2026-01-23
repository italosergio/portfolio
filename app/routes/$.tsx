import { Link } from "react-router";
import MatrixRain from "~/components/MatrixRain";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          {/* Código 404 */}
          <h1 className="text-8xl md:text-9xl font-bold text-[#10B981] mb-4" style={{ fontFamily: 'Bitcount Single, monospace' }}>
            404
          </h1>

          {/* Mensagem */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-lg text-[#94A3B8] mb-8 max-w-md mx-auto">
            Rota não encontrada. Vamos voltar para o caminho certo?
          </p>

          {/* Botão CTA */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#0B5D1E] text-black hover:text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
