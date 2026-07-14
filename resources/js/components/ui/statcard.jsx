import CountUp from "./CountUp";

export default function StatCard({ label, value, icon }) {

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-1">
            <div className="flex items-center justify-between px-1.5 py-2">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <span className=" text-prim">{icon}</span>
            </div>
            <div className=" rounded-lg p-5 border bg-gray-50 border-gray-100">
                <CountUp
                    from={0}
                    to={value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-2xl font-semibold text-gray-900"
                    delay={0}
                />
            </div>
        </div>
    );
}