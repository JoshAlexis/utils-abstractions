/**
 * Define los campos base de metadatos para el `logging`. Todas las definiciones
 * extras deben de extender de esta interfaz.
 */
export interface BaseMetadataFields extends Record<string, string | number | unknown> {
	/**
	 * El dominio (para mayor entendimiento se puede decir que es un submódulo) del elemento.
	 */
	domain?: string
	/**
	 * La capa de arquitectura.
	 */
	layer?: 'Application' | 'Infrastructure' | 'Presentation' | 'None' | string
	/**
	 * El punto dentro de la función/clase/método.
	 */
	context?: string
}
