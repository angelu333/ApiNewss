export interface Noticia {
	id?: number;
	categoria_id: number;
	estado_id: number;
	usuario_id: number;
	titulo: string;
	slug: string;
	fecha_publicacion: string;
	descripcion: string;
	imagen: string;
	estado_publicacion: 'borrador' | 'publicado' | 'archivado';
	visitas: number;
	comentarios_count: number;
	activo: boolean;
	createdAt?: string;
	updatedAt?: string;
	categoria?: any;
	estado?: any;
	usuario?: any;
}
